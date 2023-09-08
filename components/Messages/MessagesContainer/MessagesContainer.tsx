import Container from "@/components/Container/Container/Container";
import styles from "./MessagesContainer.module.scss";

interface MessagesContainerProps {
	children: React.ReactNode;
}

const MessagesContainer = ({ children }: MessagesContainerProps) => {
	return (
		<Container margin>
			<div className={styles.container}>{children}</div>
		</Container>
	);
};

export default MessagesContainer;
