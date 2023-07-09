import React, { createContext, ReactNode, useContext, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { redisServer } from "@/config";

import { AuthContext } from "./AuthContext";
import { ConversationContext } from "./ConversationContext";
import { toast } from "react-toastify";

const DefaultProps = {
	unreadMessageCount: 0,
	connectionStatus: "Uninstantiated",
};

export interface NotificationProps {
	unreadMessageCount: number;
	connectionStatus: string;
}

export const NotificationContext =
	createContext<NotificationProps>(DefaultProps);

export const NotificationContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const { user, userToken } = useContext(AuthContext);
	const { conversations, setConversations } = useContext(ConversationContext);
	const [unreadMessageCount, setUnreadMessageCount] = useState(0);

	const { readyState } = useWebSocket(
		user ? `${redisServer}/notifications/` : null,
		{
			queryParams: {
				token: user ? userToken : "",
			},
			onOpen: () => {
				console.log("Connected to Notifications!");
			},
			onClose: () => {
				console.log("Disconnected from Notifications!");
			},
			onMessage: (e) => {
				const data = JSON.parse(e.data);
				switch (data.type) {
					case "read_messages":
						setConversations(
							conversations.map((conversation) =>
								conversation.id === data.conversation.id
									? {
											...conversation,
											last_message: {
												...conversation.last_message,
												read: true,
											},
									  }
									: conversation
							)
						);

						// console.log("reading messages");
						break;

					case "new_message_notification":
						setConversations([
							data.conversation,
							...conversations.filter(
								(item) => item.id != data.message.conversation
							),
						]);
						toast(
							`New message from ${data.conversation.other_user.first_name}`,
							{
								position: "bottom-left",
								autoClose: 2000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
								theme: "light",
							}
						);
						break;
					default:
						break;
				}
			},
		}
	);

	const connectionStatus = {
		[ReadyState.CONNECTING]: "Connecting",
		[ReadyState.OPEN]: "Open",
		[ReadyState.CLOSING]: "Closing",
		[ReadyState.CLOSED]: "Closed",
		[ReadyState.UNINSTANTIATED]: "Uninstantiated",
	}[readyState];

	return (
		<NotificationContext.Provider
			value={{ unreadMessageCount, connectionStatus }}
		>
			{children}
		</NotificationContext.Provider>
	);
};
