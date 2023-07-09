import Head from "next/head";
import MessagesSidebar from "@/components/Messages/MessagesSidebar/MessagesSidebar";
import { server } from "@/config";
import axios from "axios";
import React, { useState, useEffect } from "react";
import withAuth from "@/components/Route/withAuth";
import MessagesContainer from "@/components/Messages/MessagesContainer/MessagesContainer";
import { useAuth } from "@/contexts/AuthContext";
import ChatContainer from "@/components/Messages/Chat/ChatContainer/ChatContainer";

const Messages = () => {
	const [conversationsList, setConversationsList] = useState([]);
	const [messageHistory, setMessageHistory] = useState([]);
	const { userToken } = useAuth();

	useEffect(() => {
		const config: any = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		config.headers["Authorization"] = `Token ${userToken}`;
		axios
			.get(`${server}/api/conversations/`, config)
			.then((res: any) => {
				setConversationsList(res.data);
			})
			.catch((err: any) => console.log(err));
	}, []);

	return (
		<>
			<Head>
				<title>Messages</title>
			</Head>
			<MessagesContainer>
				<MessagesSidebar />
				<ChatContainer messageHistory={messageHistory} />
			</MessagesContainer>
		</>
	);
};

export default withAuth(Messages);
