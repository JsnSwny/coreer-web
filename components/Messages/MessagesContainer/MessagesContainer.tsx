import styles from "./MessagesContainer.module.scss";

interface MessagesContainerProps {
  children: React.ReactNode;
}

const MessagesContainer = ({ children }: MessagesContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default MessagesContainer;
