import {
  appendChat,
  appendPartial,
  clearPartial,
  setStatus,
} from '@/redux/features/openai-chat';
import { Message } from '@/redux/features/openai-chat/models';
import { useAppSelector } from '@/redux/hooks';
import { StatusState } from '@/redux/utils/reducers';
import { getToken } from '@/redux/utils/token';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Socket, io } from 'socket.io-client';

export enum Events {
  CONNECT = 'connect',
  QUERY = 'query',
  RESPONSE = 'response',
  EXCEPTION = 'exception',
  DISCONNECT = 'disconnect',
}

export function useOpenAiWs() {
  const dispatch = useDispatch();
  const socket = useRef<Socket>();
  const user = useAppSelector((state) => state.userReducer.user);

  const [error, setError] = useState<string>();

  const cleanup = useCallback(() => {
    setError(undefined);
    dispatch(clearPartial());
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;

    socket.current = io(process.env.NEXT_PUBLIC_WS_URL as string, {
      extraHeaders: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    socket.current.on(Events.CONNECT, () => {
      console.log('Connected!');
    });
    socket.current.on(Events.RESPONSE, (response: string) => {
      dispatch(appendPartial(response));
    });
    socket.current.on(Events.EXCEPTION, (data: any) => {
      console.error(data);
      setError(data);
    });
    socket.current.on(Events.DISCONNECT, () => {
      cleanup();
    });

    return () => {
      socket.current?.disconnect();
      cleanup();
    };
  }, [cleanup, dispatch, user]);

  const sendQuery = useCallback(
    (query: string) => {
      dispatch(setStatus(StatusState.LOADING));
      dispatch(clearPartial());
      socket.current?.emit(Events.QUERY, { query }, (message: Message) => {
        dispatch(clearPartial());
        dispatch(appendChat(message));
        dispatch(setStatus(StatusState.SUCCESS));
      });
    },
    [dispatch],
  );

  return {
    error,
    sendQuery,
  };
}
