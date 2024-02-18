import Avatar from "../avatar";
import styles from './index.module.scss';
import { useMemo } from "react";
import { Message } from "@/redux/features/openai-chat/models";

interface Props {
  message: Message;
}

export default function ChatMessage({ message }: Props) {
  const isMe = useMemo(() => message.type === 'query', [message])
  const dateString = useMemo(() => new Date(message.created).toLocaleString(), [message])
  const username = useMemo(() => isMe ? message.username : 'GPT', [message, isMe])

  return <div className={`${styles['chat-message']} ${isMe ? styles['me'] : ''}`}>
    <Avatar seed={username} />
    <div className={styles.texts}>
      <div className={styles.user}>
        <span>{username}</span>
        <span>{dateString}</span>
      </div>
      <pre className={styles.message}>{message.message}</pre>
    </div>
  </div>
}