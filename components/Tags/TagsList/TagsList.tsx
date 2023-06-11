import { Tag as TagModel } from "@/interfaces/tag.model";
import Tag from "../Tag/Tag";
import styles from "./TagsList.module.scss";
import React from "react";
interface TagsListProps {
  tags: TagModel[];
  className?: string;
}

const TagsList = ({ tags, className }: TagsListProps) => {
  return (
    <ul className={`${styles.container} ${className}`}>
      {tags.map((tag, idx) => (
        <Tag key={idx} tag={tag} />
      ))}
    </ul>
  );
};

export default TagsList;
