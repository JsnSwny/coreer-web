import React from "react";
import styles from "./Container.module.scss";

interface ContainerProps {
  flex?: boolean;
  children: React.ReactNode;
  size?: string;
  margin?: boolean;
}

const Container = ({ flex, children, size = "medium", margin }: ContainerProps) => {
  return (
    <div
      className={`${styles.container} ${flex ? styles.flex : ""} ${styles[size]} ${
        margin ? styles.margin : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
