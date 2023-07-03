import styles from "./MessagesSidebar.module.scss";
import Conversation from "./Conversation/Conversation";
import { Conversation as ConversationType } from "@/interfaces/conversation.model";
import globalStyles from "@/styles/globalStyles.module.scss";
import MessageSelector from "../MessageSelector/MessageSelector";
import { useState } from "react";

interface MessagesSidebarProps {
	conversations: ConversationType[];
	currentConversation?: ConversationType;
}

const MessagesSidebar = ({
	conversations,
	currentConversation,
}: MessagesSidebarProps) => {
	const [activeSelector, setActiveSelector] = useState<
		"Conversations" | "Requests"
	>("Conversations");
	return (
		<div className={styles.sidebar}>
			<div className={styles.titleContainer}>
				<h1 className={styles.title}>Discover</h1>
			</div>
			<MessageSelector
				activeSelector={activeSelector}
				setActiveSelector={setActiveSelector}
			/>
			<div className={styles.contentContainer}>
				{/* <input
          className={globalStyles.input}
          placeholder="Search conversations"
        /> */}
				<ul className={styles.conversations}>
					{conversations.length == 0 ? (
						<p>You have no {activeSelector.toLowerCase()} to display.</p>
					) : (
						conversations.map((conversation) => (
							<Conversation
								key={conversation.id}
								conversation={conversation}
								isActive={currentConversation?.id == conversation?.id}
							/>
						))
					)}
				</ul>
			</div>
		</div>
	);
};

export default MessagesSidebar;
