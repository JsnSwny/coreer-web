import ChatContainer from "@/components/Messages/Chat/ChatContainer/ChatContainer";
import MessagesContainer from "@/components/Messages/MessagesContainer/MessagesContainer";
import MessagesSidebar from "@/components/Messages/MessagesSidebar/MessagesSidebar";
import withAuth from "@/components/Route/withAuth";
import { server } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

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
      </MessagesContainer>
    </>
  );
};

export default withAuth(Messages);
