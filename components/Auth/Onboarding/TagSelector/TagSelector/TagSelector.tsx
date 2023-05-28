import styles from "./TagSelector.module.scss";

interface TagSelectorProps {
  title: string;
  active: boolean;
}

const TagSelector = ({ title, active, onClick }: TagSelectorProps) => {
  return (
    <li
      className={`${styles.tag} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      {title}
    </li>
  );
};

export default TagSelector;
