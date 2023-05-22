import { Profile } from "@/interfaces/profile.model";
import styles from "./TopMatchBanner.module.scss";
import Link from "next/link";
import TagsList from "@/components/Tags/TagsList/TagsList";
import LikeButton from "@/components/Button/LikeButton/LikeButton";

interface TopMatchBannerProps {
  profile: Profile;
}

const TopMatchBanner = ({ profile }: TopMatchBannerProps) => {
  return (
    <div className={styles.banner}>
      <img className={styles.image} src={profile.profile_photo} />
      {/* <LikeButton profile={profile} /> */}
      <div className={styles.details}>
        <h3 className={styles.title}>
          {profile.first_name} {profile.last_name}
        </h3>
        <p className={styles.subtitle}>{profile.job}</p>
        <p className={styles.location}></p>
      </div>
      <span className={styles.verticalRule}></span>
      <div className={styles.right}>
        <div className={styles.rightContent}>
          <p>{profile.bio}</p>
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.button}>
            <Link className={styles.buttonLink} href={`/profile/${profile.id}`}>
              Message {profile.first_name}
            </Link>
          </button>
          <button className={`${styles.button} ${styles.buttonAlt}`}>
            <Link className={styles.buttonLink} href={`/profile/${profile.id}`}>
              View Profile
            </Link>
          </button>
          <LikeButton profile={profile} className={styles.likeButton} />
        </div>
      </div>
    </div>
  );
};

export default TopMatchBanner;
