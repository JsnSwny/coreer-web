import React from "react";
import styles from "./ProfileSection.module.scss";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

const ProfileSection = ({ title, children }: ProfileSectionProps) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  );
};

export default ProfileSection;
