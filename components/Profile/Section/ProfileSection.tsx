import { useAuth } from "@/contexts/AuthContext";
import { Profile } from "@/interfaces/profile.model";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./ProfileSection.module.scss";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  action?: () => void;
  actionIcon?: IconProp;
  icon: IconProp;
  profile: Profile;
}

const ProfileSection = ({
  title,
  children,
  action,
  actionIcon = faPencil,
  profile,
  icon,
}: ProfileSectionProps) => {
  const { user } = useAuth();
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <FontAwesomeIcon icon={icon} className={styles.titleIcon} />
          <h2>{title}</h2>
        </div>
        {profile.id == user!.id && action && (
          <FontAwesomeIcon icon={actionIcon} onClick={action} className={styles.icon} />
        )}
      </div>

      <hr className={styles.divider} />
      {children}
    </section>
  );
};

export default ProfileSection;
