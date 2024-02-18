import { Request, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwtGuard } from '../shared/guards/ws.guard';
import { Events } from '../shared/models/status';
import { AuthService } from '../auth/auth.service';
import { OpenaiService } from './openai.service';
import { MessageService } from '../message/message.service';
import { MessageType } from '../message/message.model';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseGuards(WsJwtGuard)
export class OpenaiGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private authService: AuthService,
    private openAiService: OpenaiService,
    private messageService: MessageService,
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    const user = await this.authService.validateUserByToken(
      client.handshake.headers.authorization,
    );
    client.data.id = user.id;
    return;
  }

  @SubscribeMessage(Events.QUERY)
  async queue(@Request() req, @MessageBody() data: { query: string }) {
    const username = req.user.username;
    const query = data.query;
    this.messageService.create(username, query);
    const stream = await this.openAiService.gpt35CompletionsStream(
      username,
      query,
    );
    for await (const chunk of stream) {
      const content = chunk.choices[0].delta.content;
      if (content) {
        this.server.to(req.id).emit(Events.RESPONSE, content);
      }
    }
    return this.messageService.create(
      username,
      stream.allChatCompletions()[0].choices[0].message.content,
      MessageType.RESPONSE,
    );
  }
}
