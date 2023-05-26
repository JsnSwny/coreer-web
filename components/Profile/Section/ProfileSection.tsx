import React from "react";
import styles from "./ProfileSection.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

const ProfileSection = ({ title, children }: ProfileSectionProps) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        {title} <FontAwesomeIcon icon={faPencil} />
      </h2>
      <hr className={styles.divider} />
      {children}
    </section>
  );
};

export default ProfileSection;
