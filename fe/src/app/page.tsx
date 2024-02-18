'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Chat from './_shared/components/chat';
import Header from './_shared/components/header';

import styles from './page.module.scss';
import { clearHistory } from '@/redux/features/openai-chat/reducers';

export default function Home() {
  const dispatch = useAppDispatch();
  const chatExist = useAppSelector(state => state.openAiChatReducer.chat.length)

  const onClear = () => {
    dispatch(clearHistory())
  }

  return (
    <>
      <Header />
      <h2 className={styles.title}>
        Ask me anything!
        {chatExist ? <button onClick={onClear}>Clear History</button> : null}
      </h2>
      <Chat />
    </>
  );
}
