import styles from "./TagSelectorList.module.scss";

interface TagSelectorListProps {
  children: React.ReactNode;
}

const TagSelectorList = ({ children }: TagSelectorListProps) => {
  return <ul className={styles.list}>{children}</ul>;
};

export default TagSelectorList;
