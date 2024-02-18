import { AsyncStatus } from '@/redux/utils/reducers';

export type ChatCompletionPayload = {
  query: string;
};

export enum MessageType {
  QUERY = 'query',
  RESPONSE = 'response',
}

export type Message = {
  created: string;
  username: string;
  type: MessageType;
  message: string;
};

export type ChatState = {
  chat: Message[];
  partial: string;
} & AsyncStatus;
