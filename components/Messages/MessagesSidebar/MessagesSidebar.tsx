import { Conversation as ConversationType } from "@/interfaces/conversation.model";
import Conversation from "./Conversation/Conversation";
import styles from "./MessagesSidebar.module.scss";

interface MessagesSidebarProps {
  conversations: ConversationType[];
  currentConversation?: ConversationType;
}

const MessagesSidebar = ({ conversations, currentConversation }: MessagesSidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Messages</h1>
      </div>

      <div className={styles.contentContainer}>
        {/* <input
          className={globalStyles.input}
          placeholder="Search conversations"
        /> */}
        <ul className={styles.conversations}>
          {conversations.map((conversation) => (
            <Conversation
              key={conversation.id}
              conversation={conversation}
              isActive={currentConversation?.id == conversation?.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessagesSidebar;
