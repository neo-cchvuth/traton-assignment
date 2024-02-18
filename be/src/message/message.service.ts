import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './message.schema';
import { Model } from 'mongoose';
import { MessageType } from './message.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  public async findByUsername(username: string) {
    return this.messageModel
      .find({
        username,
      })
      .exec();
  }

  public async deleteByUsername(username: string) {
    return this.messageModel
      .deleteMany({
        username,
      })
      .exec();
  }

  public async getLastMessages(username: string, n = 3) {
    return this.messageModel
      .find({ username, type: MessageType.QUERY })
      .sort({ $natural: 1 })
      .limit(n)
      .exec();
  }

  public async create(
    username: string,
    message: string,
    type: MessageType = MessageType.QUERY,
  ): Promise<MessageDocument> {
    const createdMessage = new this.messageModel({
      username,
      message,
      type,
      created: new Date().toISOString(),
    });
    return createdMessage.save();
  }
}
