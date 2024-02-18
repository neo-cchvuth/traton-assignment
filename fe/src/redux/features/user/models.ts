import { AsyncStatus } from '@/redux/utils/reducers';

export type User = {
  id: string;
  username: string;
};

export type UserState = {
  user?: User;
} & AsyncStatus;

export type UserResponse = User;
