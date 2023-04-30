import React from "react";
import styles from "./Section.module.scss";

interface SectionProps {
  children: React.ReactNode;
  title: string;
}

const Section = ({ children, title }: SectionProps) => {
  return (
    <>
      <h3 className={styles.title}>{title}</h3>
      {children}
    </>
  );
};

export default Section;
