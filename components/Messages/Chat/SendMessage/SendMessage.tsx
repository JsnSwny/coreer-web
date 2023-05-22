import { useState } from "react";

interface SendMessageProps {
  sendMessage: (e: any, message: string) => void;
}

const SendMessage = ({ sendMessage }: SendMessageProps) => {
  const [message, setMessage] = useState("");
  return (
    <form
      onSubmit={(e) => {
        sendMessage(e, message);
        setMessage("");
      }}
    >
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
