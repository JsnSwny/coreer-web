import { useState } from "react";
import styles from "./SendMessage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface SendMessageProps {
  sendMessage: (e: any, message: string) => void;
}

const SendMessage = ({ sendMessage }: SendMessageProps) => {
  const [message, setMessage] = useState("");
  return (
    <footer className={styles.footer}>
      <div className={styles.formWrapper}>
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
            autoFocus
            className={styles.input}
            placeholder="Type your message here..."
          />
        </form>
        <FontAwesomeIcon
          onClick={(e) => {
            sendMessage(e, message);
            setMessage("");
          }}
          icon={faPaperPlane}
          className={`${styles.icon} ${
            message.length > 0 ? styles.active : ""
          }`}
        />
      </div>
    </footer>
  );
};

export default SendMessage;
