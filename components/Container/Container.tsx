import React from "react";
import styles from "./Container.module.scss";

interface ContainerProps {
  flex?: boolean;
  children: React.ReactNode;
  size?: string;
}

const Container = ({ flex, children, size = "medium" }: ContainerProps) => {
  return (
    <div
      className={`${styles.container} ${flex ? styles.flex : ""} ${
        styles[size]
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
