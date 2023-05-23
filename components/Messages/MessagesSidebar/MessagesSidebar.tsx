import styles from "./MessagesSidebar.module.scss";
import Conversation from "./Conversation/Conversation";
import { Conversation as ConversationType } from "@/interfaces/conversation.model";

interface MessagesSidebarProps {
  conversations: ConversationType[];
  currentConversation: ConversationType;
}

const MessagesSidebar = ({
  conversations,
  currentConversation,
}: MessagesSidebarProps) => {
  console.log(conversations);
  return (
    <div className={styles.sidebar}>
      <h1 className={styles.title}>Messages</h1>
      <input />
      <ul className={styles.conversations}>
        {conversations.map((conversation) => (
          <Conversation
            conversation={conversation}
            isActive={currentConversation?.id == conversation?.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default MessagesSidebar;
