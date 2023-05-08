import styles from "./TagSelector.module.scss";

interface TagSelectorProps {
  title: string;
  active: boolean;
}

const TagSelector = ({ title, active }: TagSelectorProps) => {
  return (
    <li className={`${styles.tag} ${active ? styles.active : ""}`}>{title}</li>
  );
};

export default TagSelector;
