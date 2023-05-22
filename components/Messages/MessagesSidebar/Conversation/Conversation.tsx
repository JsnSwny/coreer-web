import { Conversation as ConversationType } from "@/interfaces/conversation.model";
import styles from "./Conversation.module.scss";
import Link from "next/link";

interface ConversationProps {
  conversation: ConversationType;
  isActive?: boolean;
}

const Conversation = ({
  conversation,
  isActive = false,
}: ConversationProps) => {
  return (
    <li className={`${styles.conversation} ${isActive ? styles.active : ""}`}>
      <Link href={`/messages/${conversation.name}`} className={styles.link}>
        <img
          className={styles.image}
          src={conversation.other_user.profile_photo}
        />
        <div className={styles.content}>
          <h4 className={styles.name}>
            {conversation.other_user.first_name}{" "}
            {conversation.other_user.last_name}
          </h4>
          <p className={styles.last_message}>
            {conversation.last_message?.content}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Conversation;
