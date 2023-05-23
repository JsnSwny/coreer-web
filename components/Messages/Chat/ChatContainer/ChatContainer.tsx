import { Message as MessageType } from "@/interfaces/message.model";
import styles from "./ChatContainer.module.scss";
import Message from "../Message/Message";
import SendMessage from "../SendMessage/SendMessage";

interface ChatContainerProps {
  messageHistory: MessageType[];
  sendMessage: (e: any, message: string) => void;
}

const ChatContainer = ({ messageHistory, sendMessage }: ChatContainerProps) => {
  return (
    <section className={styles.container}>
      <ul className={styles.wrapper}>
        {messageHistory.map((message) => (
          <Message message={message} />
        ))}
      </ul>

      <SendMessage sendMessage={sendMessage} />
    </section>
  );
};

export default ChatContainer;
