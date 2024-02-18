import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema, Message } from '../message/message.schema';
import { MessageService } from './message.service';
import { CacheModule } from '@nestjs/cache-manager';
import { MessageController } from './message.controller';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService, MongooseModule],
})
export class MessageModule {}
