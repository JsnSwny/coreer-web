import Head from "next/head";
import MessagesSidebar from "@/components/Messages/MessagesSidebar/MessagesSidebar";
import { server } from "@/config";
import cookie from "cookie";
import axios from "axios";
import { Conversation } from "@/interfaces/conversation.model";
import withAuth from "@/components/Route/withAuth";

interface MessagesProps {
  conversations: Conversation[];
}

const messages = ({ conversations }: MessagesProps) => {
  return (
    <>
      <Head>
        <title>Messages</title>
      </Head>

      <MessagesSidebar conversations={conversations} />
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { req } = context;
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.token;

  const config: any = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let conversations: Conversation[] = [];

  config.headers["Authorization"] = `Token ${token}`;
  await axios
    .get(`${server}/api/conversations/`, config)
    .then((res: any) => {
      conversations = res.data;
    })
    .catch((err: any) => console.log(err));

  return {
    props: {
      conversations: conversations,
    },
  };
};

export default withAuth(messages);
