import { Controller, Delete, Get, Req, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { MessageService } from './message.service';

@Controller('message')
@UseInterceptors(CacheInterceptor)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('history')
  async getChatHistory(@Req() req) {
    return this.messageService.findByUsername(req.user.username);
  }

  @Delete('history')
  async deleteChatHistory(@Req() req) {
    return this.messageService.deleteByUsername(req.user.username);
  }
}
