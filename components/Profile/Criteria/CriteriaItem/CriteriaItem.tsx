import TagsList from "@/components/Tags/TagsList/TagsList";
import styles from "./CriteriaItem.module.scss";
import { Profile } from "@/interfaces/profile.model";

interface CriteriaItemProps {
  title: string;
  items: [];
}

const CriteriaItem = ({ title, items }: CriteriaItemProps) => {
  return (
    <li className={styles.criteriaItem}>
      <h2>{title}</h2>
      <TagsList
        tags={items.map((item) => ({ text: item.name }))}
        className={styles.tags}
      />
    </li>
  );
};

export default CriteriaItem;
