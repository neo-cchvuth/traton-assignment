import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiGateway } from './openai.gateway';
import { AuthModule } from '../auth/auth.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [AuthModule, MessageModule],
  providers: [OpenaiGateway, OpenaiService],
})
export class OpenaiModule {}
