import TagsList from "@/components/Tags/TagsList/TagsList";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CriteriaItem.module.scss";

interface Item {
  name: string;
  color: string;
}
interface CriteriaItemProps {
  title: string;
  items: Item[];
  openModal?: () => void;
  canEdit?: boolean;
}

const CriteriaItem = ({ title, items, openModal, canEdit }: CriteriaItemProps) => {
  return (
    <li className={styles.criteriaItem}>
      <div className={styles.criteriaHeader}>
        <h2>{title}</h2>
        {canEdit && openModal && <FontAwesomeIcon icon={faPencil} onClick={openModal} />}
      </div>

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
