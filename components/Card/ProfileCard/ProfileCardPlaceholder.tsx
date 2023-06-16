import globalStyles from "@/styles/globalStyles.module.scss";
import styles from "./ProfileCard.module.scss";

const ProfileCardPlaceholder = () => {
  return (
    <div className={styles.card}>
      <div className={`${globalStyles.placeholderWhite} ${styles.image}`}></div>
      {/* <LikeButton profile={profile} className={styles.likeButton} /> */}
      <div className={styles.content}>
        <div className={`${globalStyles.placeholderWhite} ${styles.titlePlaceholder}`}></div>
        <div className={`${globalStyles.placeholderWhite} ${styles.subtitlePlaceholder}`}></div>
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
