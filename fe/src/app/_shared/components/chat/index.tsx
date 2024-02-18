import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import ChatInput from '../chat-input'
import ChatMessage from '../chat-message'
import styles from './index.module.scss'
import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';
import { getHistory } from '@/redux/features/openai-chat/reducers';
import { MessageType } from '@/redux/features/openai-chat/models';

export default function Chat() {
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.userReducer.user?.username)
  const chat = useAppSelector((state) => state.openAiChatReducer.chat);
  const partial = useAppSelector((state) => state.openAiChatReducer.partial);
  const partialMessage = useMemo(() => (
    <ChatMessage
      message={{ message: partial, created: new Date().toISOString(), type: MessageType.RESPONSE, username: username || '' }}
    />),
    [partial, username])
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(getHistory())
  }, [dispatch])

  useEffect(() => {
    const ele = chatRef.current;
    if (ele) {
      ele.scroll({ top: ele.scrollHeight });
    }
  }, [chat, partial, chatRef])

  return <div className={styles['chat-container']}>
    <div className={styles.messages} ref={chatRef}>
      <div className={styles.pusher}></div>
      {chat.map(message => (<ChatMessage key={message.created} message={message} />))}
      {partial && partialMessage}
    </div>
    <ChatInput />
  </div>
}