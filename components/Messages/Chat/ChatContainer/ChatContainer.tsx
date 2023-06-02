import { Message as MessageType } from "@/interfaces/message.model";
import styles from "./ChatContainer.module.scss";
import Message from "../Message/Message";
import SendMessage from "../SendMessage/SendMessage";
import ChatHeader from "../ChatHeader/ChatHeader";
import { Conversation } from "@/interfaces/conversation.model";

interface ChatContainerProps {
  messageHistory: MessageType[];
  sendMessage?: (e: any, message: string) => void;
  currentConversation?: Conversation;
}

const ChatContainer = ({
  messageHistory,
  sendMessage,
  currentConversation,
}: ChatContainerProps) => {
  return (
    <section className={styles.container}>
      {currentConversation && (
        <>
          <ChatHeader currentConversation={currentConversation} />
          <div className={styles.messagesContainer}>
            <ul className={styles.wrapper}>
              {messageHistory.map((message) => (
                <Message message={message} />
              ))}
            </ul>
          </div>
          {sendMessage && <SendMessage sendMessage={sendMessage} />}
        </>
      )}
    </section>
  );
};

export default ChatContainer;
