import styles from "./ProfileCardList.module.scss";
import React from "react";

interface CardListProps {
  children: React.ReactNode;
}

const ProfileCardList = ({ children }: CardListProps) => {
  return <div className={styles.cards}>{children}</div>;
};

export default ProfileCardList;
