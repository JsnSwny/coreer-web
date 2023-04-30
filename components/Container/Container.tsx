import React from "react";
import styles from "./Container.module.scss";

interface ContainerProps {
  flex?: boolean;
  children: React.ReactNode;
}

const Container = ({ flex, children }: ContainerProps) => {
  return (
    <div className={`${styles.container} ${flex ? styles.flex : ""}`}>
      {children}
    </div>
  );
};

export default Container;
