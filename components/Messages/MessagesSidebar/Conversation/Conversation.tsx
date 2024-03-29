import { Conversation as ConversationType } from "@/interfaces/conversation.model";
import styles from "./Conversation.module.scss";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

interface ConversationProps {
	conversation: ConversationType;
	isActive?: boolean;
}

const Conversation = ({
	conversation,
	isActive = false,
}: ConversationProps) => {
	const { user } = useAuth();
	return (
		<li className={`${styles.conversation} ${isActive ? styles.active : ""}`}>
			<Link href={`/messages/${conversation.name}`} className={styles.link}>
				<img
					className={styles.image}
					src={
						conversation.other_user.profile_photo
							? conversation.other_user.profile_photo
							: conversation.other_user.image
					}
				/>
				<div
					className={`${styles.content} ${
						conversation.last_message &&
						conversation.last_message.from_user.id != user!.id &&
						!conversation.last_message.read
							? styles.unread
							: ""
					}`}
				>
					<h4 className={styles.name}>
						{conversation.other_user.first_name}{" "}
						{conversation.other_user.last_name}
					</h4>
					{conversation.last_message && (
						<p className={styles.last_message}>
							{conversation.last_message?.content}
						</p>
					)}
				</div>
			</Link>
		</li>
	);
};

export default Conversation;
