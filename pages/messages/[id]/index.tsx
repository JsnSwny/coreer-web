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

interface MessagesProps {
  conversations: Conversation[];
  currentConversation: Conversation;
  id: number;
}

const messages = ({
  conversations,
  currentConversation,
  id,
}: MessagesProps) => {
  const [conversationsList, setConversationsList] = useState(conversations);
  const [messageHistory, setMessageHistory] = useState([]);

  const { userToken } = useAuth();

  const { readyState, sendJsonMessage } = useWebSocket(
    `ws://192.168.0.14:8000/ws/chat/${id}/?token=${userToken}`,
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
            break;
        }
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
        <title>Messages</title>
      </Head>
      <MessagesContainer>
        <MessagesSidebar
          conversations={conversationsList}
          currentConversation={currentConversation}
        />
        <ChatContainer
          sendMessage={sendMessage}
          messageHistory={messageHistory}
          currentConversation={currentConversation}
        />
        <MessagesDetailsContainer />
      </MessagesContainer>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { req } = context;
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.token;

  const [userID1, userID2] = context.params.id.split("__");

  const config: any = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let conversations: Conversation[] | null = [];

  config.headers["Authorization"] = `Token ${token}`;
  await axios
    .get(`${server}/api/conversations/`, config)
    .then((res: any) => {
      conversations = res.data;
    })
    .catch((err: any) => console.log(err));

  let currentConversation = conversations.find(
    (item) => item.name == context.params.id
  );

  return {
    props: {
      conversations: conversations,
      currentConversation: currentConversation ? currentConversation : null,
      id: context.params.id,
    },
  };
};

export default withAuth(messages);
