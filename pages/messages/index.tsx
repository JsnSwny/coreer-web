import Head from "next/head";
import MessagesSidebar from "@/components/Messages/MessagesSidebar/MessagesSidebar";

const messages = () => {
  return (
    <>
      <Head>
        <title>Messages</title>
      </Head>
      <MessagesSidebar />
    </>
  );
};

export default messages;
