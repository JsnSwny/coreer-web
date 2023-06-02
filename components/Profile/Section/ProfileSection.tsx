import React from "react";
import styles from "./ProfileSection.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Profile } from "@/interfaces/profile.model";
import { useAuth } from "@/contexts/AuthContext";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  action?: () => void;
  actionIcon?: IconProp;
  profile: Profile;
}

const ProfileSection = ({
  title,
  children,
  action,
  actionIcon = faPencil,
  profile,
}: ProfileSectionProps) => {
  const { user } = useAuth();
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        {title}{" "}
        {profile.id == user!.id && action && (
          <FontAwesomeIcon
            icon={actionIcon}
            onClick={action}
            className={styles.icon}
          />
        )}
      </h2>
      <hr className={styles.divider} />
      {children}
    </section>
  );
};

export default ProfileSection;
