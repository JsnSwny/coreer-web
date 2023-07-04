import styles from "./MessagesSidebar.module.scss";
import Conversation from "./Conversation/Conversation";
import { Conversation as ConversationType } from "@/interfaces/conversation.model";
import globalStyles from "@/styles/globalStyles.module.scss";
import MessageSelector from "../MessageSelector/MessageSelector";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { server } from "@/config";
import { useContext } from "react";
import { ConversationContext } from "@/contexts/ConversationContext";
import { useRouter } from "next/router";
import LikeProfile from "./LikeProfile/LikeProfile";

interface MessagesSidebarProps {
	currentConversation?: ConversationType;
}

const MessagesSidebar = ({ currentConversation }: MessagesSidebarProps) => {
	const router = useRouter();
	const { conversations, likes } = useContext(ConversationContext);
	const { user, userToken } = useAuth();
	const [activeSelector, setActiveSelector] = useState<
		"Conversations" | "Likes"
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
					{activeSelector == "Conversations" ? (
						conversations.length == 0 ? (
							<p className={styles.conversationsText}>
								You have no {activeSelector.toLowerCase()} to display.
							</p>
						) : (
							conversations.map((conversation) => {
								return (
									<Conversation
										key={conversation.id}
										conversation={conversation}
										isActive={router.query.id == conversation?.name}
									/>
								);
							})
						)
					) : likes.length == 0 ? (
						<p className={styles.conversationsText}>
							You have no likes to display.
						</p>
					) : (
						likes.map((profile) => {
							return <LikeProfile key={profile.id} profile={profile} />;
						})
					)}
				</ul>
			</div>
		</div>
	);
};

export default MessagesSidebar;
