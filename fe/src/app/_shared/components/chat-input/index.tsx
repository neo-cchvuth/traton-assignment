import { FormEvent, useCallback, useRef } from 'react';
import Input, { InputHandle } from '../input';
import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { appendChat } from '@/redux/features/openai-chat';
import Image from 'next/image';
import { MessageType } from '@/redux/features/openai-chat/models';
import { useOpenAiWs } from '../../hooks/use-openai-ws';

export default function ChatInput() {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.userReducer.user?.username);
  const isLoading = useAppSelector(
    (state) => state.openAiChatReducer.status === 'loading',
  );
  const { sendQuery } = useOpenAiWs();
  const queryRef = useRef<InputHandle>(null);
  const send = useCallback((event: FormEvent) => {
    event.preventDefault();
    const query = queryRef.current?.getValue();
    if (username && query) {
      dispatch(appendChat({
        created: new Date().toISOString(),
        message: query,
        type: MessageType.QUERY,
        username
      }));
      sendQuery(query);
      queryRef.current?.clearValue()
    }
  }, [username, dispatch, sendQuery])

  return <form className={styles['input-container']} onSubmit={send}>
    <Input
      name="query"
      placeholder="Query"
      autofocus={true}
      ref={queryRef}
    />
    <button type="submit" disabled={isLoading}>
      {!isLoading ? 'Send' : <Image alt="" src="/images/ellipsis.svg" height={30} width={60} />}
    </button>
  </form>
}