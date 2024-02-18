import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { MessageType } from './message.model';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true, index: true })
  username: string;

  @Prop({ required: true })
  type: MessageType;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, type: SchemaTypes.Date, auto: true })
  created: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
