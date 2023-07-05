import Head from "next/head";
import MessagesSidebar from "@/components/Messages/MessagesSidebar/MessagesSidebar";
import { server } from "@/config";
import cookie from "cookie";
import axios from "axios";
import { Conversation } from "@/interfaces/conversation.model";
import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import withAuth from "@/components/Route/withAuth";
import MessagesContainer from "@/components/Messages/MessagesContainer/MessagesContainer";
import { useAuth } from "@/contexts/AuthContext";
import ChatContainer from "@/components/Messages/Chat/ChatContainer/ChatContainer";
import { redisServer } from "@/config";
import { useRouter } from "next/router";
import { ConversationContext } from "@/contexts/ConversationContext";
import { useContext } from "react";

interface MessagesProps {
	conversations: Conversation[];
	currConversation: Conversation;
	id: number;
}

const Messages = () => {
	const [messageHistory, setMessageHistory] = useState([]);

	const { conversations, setConversations } = useContext(ConversationContext);
	const [currentConversation, setCurrentConversation] =
		useState<Conversation | null>(null);

	const { userToken } = useAuth();
	const router = useRouter();

	const { readyState, sendJsonMessage } = useWebSocket(
		`${redisServer}/ws/chat/${router.query.id}/?token=${userToken}`,
		{
			onMessage: (e) => {
				const data = JSON.parse(e.data);
				sendJsonMessage({ type: "read_messages" });
				switch (data.type) {
					case "chat_message_echo":
						setMessageHistory((previous): any => [...previous, data.message]);
						break;
					case "message_history":
						setMessageHistory(data.messages);

						setCurrentConversation(data.conversation);
						break;
				}
			},
			onError: (error) => {
				console.log("Websocket error:", error);
			},
			onOpen: () => {
				console.log("Connected!");
			},
			onClose: () => {
				console.log("Disconnected!");
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

	useEffect(() => {
		if (connectionStatus === "Open") {
			sendJsonMessage({
				type: "read_messages",
			});
		}
	}, [connectionStatus, sendJsonMessage]);

	const sendMessage = (e: any, message: any) => {
		e.preventDefault();
		sendJsonMessage({
			type: "chat_message",
			message,
		});
	};

	return (
		<>
			<Head>
				<title>
					{currentConversation?.other_user &&
						`${currentConversation.other_user.first_name} ${currentConversation.other_user.last_name}`}{" "}
					| Messages
				</title>
			</Head>
			<MessagesContainer>
				<ChatContainer
					sendMessage={sendMessage}
					messageHistory={messageHistory}
					currentConversation={currentConversation}
				/>
			</MessagesContainer>
		</>
	);
};

export default withAuth(Messages);
