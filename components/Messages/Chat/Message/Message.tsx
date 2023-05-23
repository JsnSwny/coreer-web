import { useAuth } from "@/contexts/AuthContext";
import { Message as MessageType } from "@/interfaces/message.model";
import styles from "./Message.module.scss";

interface MessageProps {
  message: MessageType;
}

const Message = ({ message }: MessageProps) => {
  const { user } = useAuth();
  const isFromUser = user.id == message.from_user.id;
  return (
    <li className={`${styles.container} ${isFromUser ? styles.fromUser : ""}`}>
      <div className={styles.messageWrapper}>
        <div className={styles.content}>
          <p className={styles.contentText}>{message.content}</p>
        </div>
      </div>
    </li>
  );
};

export default Message;
