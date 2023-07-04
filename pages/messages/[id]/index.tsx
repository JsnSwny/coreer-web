import Head from "next/head";
import MessagesSidebar from "@/components/Messages/MessagesSidebar/MessagesSidebar";
import { server } from "@/config";
import cookie from "cookie";
import axios from "axios";
import { Conversation } from "@/interfaces/conversation.model";
import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import withAuth from "@/components/Route/withAuth";
import MessagesContainer from "@/components/Messages/MessagesContainer/MessagesContainer";
import { useAuth } from "@/contexts/AuthContext";
import ChatContainer from "@/components/Messages/Chat/ChatContainer/ChatContainer";
import { redisServer } from "@/config";
import { useRouter } from "next/router";

interface MessagesProps {
	conversations: Conversation[];
	currConversation: Conversation;
	id: number;
}

const Messages = ({ conversations, currConversation, id }: MessagesProps) => {
	const [conversationsList, setConversationsList] = useState(conversations);
	const [messageHistory, setMessageHistory] = useState([]);
	const [currentConversation, setCurrentConversation] =
		useState(currConversation);

	const { userToken } = useAuth();
	const router = useRouter();

	const { sendJsonMessage } = useWebSocket(
		`${redisServer}/ws/chat/${router.query.id}/?token=${userToken}`,
		{
			onMessage: (e) => {
				const data = JSON.parse(e.data);
				switch (data.type) {
					case "chat_message_echo":
						setMessageHistory((previous): any => [...previous, data.message]);
						break;
					case "message_history":
						// console.log("MESSAGE HISTORY:");
						// console.log(data);
						// setConversationsList([data.conversation, ...conversationsList]);
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
