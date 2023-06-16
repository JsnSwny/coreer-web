import React from "react";
import styles from "./ProfileCardList.module.scss";

interface CardListProps {
  children: React.ReactNode;
  className?: string;
  large?: boolean;
}

const ProfileCardList = ({ children, className, large = false }: CardListProps) => {
  return (
    <ul className={`${styles.cards} ${className} ${large ? styles.large : ""}`}>{children}</ul>
  );
};

export default ProfileCardList;
