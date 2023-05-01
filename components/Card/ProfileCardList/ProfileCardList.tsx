import styles from "./ProfileCardList.module.scss";
import React from "react";

interface CardListProps {
  children: React.ReactNode;
  className?: string;
  large?: boolean;
}

const ProfileCardList = ({
  children,
  className,
  large = false,
}: CardListProps) => {
  return (
    <ul className={`${styles.cards} ${className} ${large ? styles.large : ""}`}>
      {children}
    </ul>
  );
};

export default ProfileCardList;
