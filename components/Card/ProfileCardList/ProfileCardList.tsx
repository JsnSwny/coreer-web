import styles from "./ProfileCardList.module.scss";
import React from "react";

interface CardListProps {
  children: React.ReactNode;
  className: string;
}

const ProfileCardList = ({ children, className }: CardListProps) => {
  return <div className={`${styles.cards} ${className}`}>{children}</div>;
};

export default ProfileCardList;
