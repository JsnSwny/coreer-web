import { Tag as TagModel } from "@/interfaces/tag.model";
import Tag from "../Tag/Tag";
import styles from "./TagsList.module.scss";
interface TagsListProps {
  tags: TagModel[];
}

const TagsList = ({ tags }: TagsListProps) => {
  return (
    <ul className={styles.container}>
      {tags.map((tag) => (
        <Tag tag={tag} />
      ))}
    </ul>
  );
};

export default TagsList;
