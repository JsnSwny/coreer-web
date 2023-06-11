import Head from "next/head";
import MessagesSidebar from "@/components/Messages/MessagesSidebar/MessagesSidebar";
import { server } from "@/config";
import cookie from "cookie";
import axios from "axios";
import { Conversation } from "@/interfaces/conversation.model";
import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import withAuth from "@/components/Route/withAuth";
import MessagesContainer from "@/components/Messages/MessagesContainer/MessagesContainer";
import SendMessage from "@/components/Messages/Chat/SendMessage/SendMessage";
import { useAuth } from "@/contexts/AuthContext";
import { Message } from "@/interfaces/message.model";
import ChatContainer from "@/components/Messages/Chat/ChatContainer/ChatContainer";
import MessagesDetailsContainer from "@/components/Messages/MessagesDetails/MessagesDetailsContainer/MessagesDetailsContainer";

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
        <MessagesSidebar conversations={conversationsList} />
        <ChatContainer messageHistory={messageHistory} />
        {/* <MessagesDetailsContainer /> */}
      </MessagesContainer>
    </>
  );
};

export default withAuth(Messages);
