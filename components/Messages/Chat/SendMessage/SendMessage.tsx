import { useState } from "react";
import styles from "./SendMessage.module.scss";

interface SendMessageProps {
  sendMessage: (e: any, message: string) => void;
}

const SendMessage = ({ sendMessage }: SendMessageProps) => {
  const [message, setMessage] = useState("");
  return (
    <footer className={styles.footer}>
      <form
        onSubmit={(e) => {
          sendMessage(e, message);
          setMessage("");
        }}
        className={styles.form}
      >
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className={styles.input}
        />
        <button type="submit">Send</button>
      </form>
    </footer>
  );
};

export default SendMessage;
