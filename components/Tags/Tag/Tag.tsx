import { Tag } from "@/interfaces/tag.model";
import styles from "./Tag.module.scss";

interface TagProps {
	tag: Tag;
	small: boolean;
}

const Tag = ({ tag, small }: TagProps) => {
	return (
		<li
			className={`${styles.container} ${
				tag.highlight ? styles.highlight : ""
			} ${tag.color ? styles[tag.color] : ""} ${small ? styles.small : ""}`}
		>
			{tag.text}
		</li>
	);
};

export default Tag;
