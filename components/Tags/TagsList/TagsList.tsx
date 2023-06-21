import { Tag as TagModel } from "@/interfaces/tag.model";
import Tag from "../Tag/Tag";
import styles from "./TagsList.module.scss";
import React from "react";
interface TagsListProps {
	tags: TagModel[];
	className?: string;
	fade?: boolean;
}

const TagsList = ({ tags, className, fade = false }: TagsListProps) => {
	return (
		<ul
			className={`${styles.container} ${className} ${fade ? styles.fade : ""}`}
		>
			{tags
				.sort((a, b) => b.highlight - a.highlight)
				.map((tag, idx) => (
					<Tag key={idx} tag={tag} />
				))}
		</ul>
	);
};

export default TagsList;
