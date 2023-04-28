import React from "react";
import styles from "./LargeContainer.module.scss";

interface ContainerProps {
  children: React.ReactNode;
}

const LargeContainer = ({ children }: ContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default LargeContainer;
