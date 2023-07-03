import styles from "./MessageSelector.module.scss";

interface MessageSelectorProps {
	activeSelector: "Conversations" | "Requests";
	setActiveSelector: (selector: "Conversations" | "Requests") => void;
}

const MessageSelector = ({
	activeSelector,
	setActiveSelector,
}: MessageSelectorProps) => {
	return (
		<ul className={styles.selector}>
			<li
				className={`${styles.selectorItem} ${
					activeSelector == "Conversations" ? styles.active : ""
				}`}
				onClick={() => setActiveSelector("Conversations")}
			>
				Conversations
			</li>
			<li
				className={`${styles.selectorItem} ${
					activeSelector == "Requests" ? styles.active : ""
				}`}
				onClick={() => setActiveSelector("Requests")}
			>
				Requests
			</li>
		</ul>
	);
};

export default MessageSelector;
