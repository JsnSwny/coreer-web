import styles from "./SectionList.module.scss";

interface SectionListProps {
  children: React.ReactNode;
}

const SectionList = ({ children }: SectionListProps) => {
  return <div className={styles.sectionList}>{children}</div>;
};

export default SectionList;
