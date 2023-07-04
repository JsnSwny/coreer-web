import styles from "./MessageSelector.module.scss";

interface MessageSelectorProps {
	activeSelector: "Conversations" | "Likes";
	setActiveSelector: (selector: "Conversations" | "Likes") => void;
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
					activeSelector == "Likes" ? styles.active : ""
				}`}
				onClick={() => setActiveSelector("Likes")}
			>
				Likes
			</li>
		</ul>
	);
};

export default MessageSelector;
