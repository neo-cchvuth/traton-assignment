import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class OpenaiService {
  private readonly openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  constructor(private messageService: MessageService) {}

  public async gpt35CompletionsStream(
    username: string,
    query: string,
    temperature = 0.8,
  ) {
    const role = 'user';
    const messages = await this.messageService.getLastMessages(username);
    const mapped: ChatCompletionMessageParam[] = messages.map((m) => ({
      role,
      content: m.message,
    }));
    return this.openai.beta.chat.completions.stream({
      model: 'gpt-3.5-turbo-0125',
      messages: [
        ...mapped,
        {
          role,
          content: query,
        },
      ],
      temperature,
      stream: true,
    });
  }
}
