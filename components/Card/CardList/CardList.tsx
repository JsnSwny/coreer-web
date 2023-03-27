import styles from "./CardList.module.scss";
import React from "react";

interface CardListProps {
  children: React.ReactNode;
}

const CardList = ({ children }: CardListProps) => {
  return <div className={styles.cards}>{children}</div>;
};

export default CardList;
