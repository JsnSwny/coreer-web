import { format } from "date-fns";
import React from "react";
import styles from "./ProfileCard.module.scss";
import { Profile } from "@/interfaces/profile.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import TagsList from "@/components/Tags/TagsList/TagsList";
import Link from "next/link";
import LikeButton from "@/components/Button/LikeButton/LikeButton";
import globalStyles from "@/styles/globalStyles.module.scss";

const ProfileCardPlaceholder = () => {
  return (
    <div className={styles.card}>
      <div className={`${globalStyles.placeholderWhite} ${styles.image}`}></div>
      {/* <LikeButton profile={profile} className={styles.likeButton} /> */}
      <div className={styles.content}>
        <div
          className={`${globalStyles.placeholderWhite} ${styles.titlePlaceholder}`}
        ></div>
        <div
          className={`${globalStyles.placeholderWhite} ${styles.subtitlePlaceholder}`}
        ></div>
      </div>

      {/* {profile.languages.length > 0 && (
        <>
          <hr className={styles.divider} />
          <TagsList
            tags={profile.languages.map((item) => ({ text: item.name }))}
            className={styles.tags}
          />
        </>
      )} */}
    </div>
  );
};

export default ProfileCardPlaceholder;
