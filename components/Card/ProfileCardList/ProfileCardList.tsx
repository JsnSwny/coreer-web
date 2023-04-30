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
    <div
      className={`${styles.cards} ${className} ${large ? styles.large : ""}`}
    >
      {children}
    </div>
  );
};

export default ProfileCardList;
