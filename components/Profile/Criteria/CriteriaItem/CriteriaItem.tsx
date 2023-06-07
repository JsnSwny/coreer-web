import TagsList from "@/components/Tags/TagsList/TagsList";
import styles from "./CriteriaItem.module.scss";
import { Profile } from "@/interfaces/profile.model";

interface Item {
  name: string;
  color: string;
}
interface CriteriaItemProps {
  title: string;
  items: Item[];
}

const CriteriaItem = ({ title, items }: CriteriaItemProps) => {
  return (
    <li className={styles.criteriaItem}>
      <h2>{title}</h2>
      <TagsList
        tags={items.map((item: Item) => ({
          text: item.name,
          color: item.color,
        }))}
        className={styles.tags}
      />
    </li>
  );
};

export default CriteriaItem;
