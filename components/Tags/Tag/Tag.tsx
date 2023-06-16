import { Tag } from "@/interfaces/tag.model";
import styles from "./Tag.module.scss";

interface TagProps {
  tag: Tag;
}

const Tag = ({ tag }: TagProps) => {
  return (
    <li className={`${styles.container} ${tag.color ? styles[tag.color] : ""}`}>{tag.text}</li>
  );
};

export default Tag;
