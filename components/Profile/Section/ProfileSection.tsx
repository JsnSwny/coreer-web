import React from "react";
import styles from "./ProfileSection.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Profile } from "@/interfaces/profile.model";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  action?: () => void;
  profile: Profile;
}

const ProfileSection = ({
  title,
  children,
  action,
  profile,
}: ProfileSectionProps) => {
  const { user } = useAuth();
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        {title}{" "}
        {profile.id == user.id && action && (
          <FontAwesomeIcon
            icon={faPencil}
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
