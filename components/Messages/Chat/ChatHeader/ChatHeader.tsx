import { Conversation } from "@/interfaces/conversation.model";
import styles from "./ChatHeader.module.scss";
import Link from "next/link";

interface ChatHeaderProps {
  currentConversation: Conversation;
}

const ChatHeader = ({ currentConversation }: ChatHeaderProps) => {
  return (
    <header className={styles.header}>
      <Link
        href={`/profile/${currentConversation.other_user.id}`}
        className={styles.link}
      >
        <img
          className={styles.image}
          src={currentConversation.other_user.profile_photo}
        />
        <div className={styles.content}>
          <h4 className={styles.name}>
            {currentConversation.other_user.first_name}{" "}
            {currentConversation.other_user.last_name}
          </h4>
          <p className={styles.job}>{currentConversation.other_user.job}</p>
        </div>
      </Link>
    </header>
  );
};

export default ChatHeader;
