import LikeButton from "@/components/Button/LikeButton/LikeButton";
import { useAuth } from "@/contexts/AuthContext";
import { Profile } from "@/interfaces/profile.model";
import { chatHrefConstructor } from "@/utils/chatHrefConstructor";
import Link from "next/link";
import styles from "./TopMatchBanner.module.scss";

interface TopMatchBannerProps {
  profile: Profile;
}

const TopMatchBanner = ({ profile }: TopMatchBannerProps) => {
  const { user } = useAuth();
  return (
    <div className={styles.banner}>
      <div className={styles.left}>
        <img className={styles.image} src={profile.image} />
        <div className={styles.details}>
          <h3 className={styles.title}>
            {profile.first_name} {profile.last_name}
          </h3>
          <p className={styles.subtitle}>{profile.job}</p>
          <p className={styles.location}></p>
        </div>
        <span className={styles.verticalRule}></span>
      </div>
      <div className={styles.right}>
        <div className={styles.rightContent}>
          <p>{profile.bio}</p>
        </div>
        <div className={styles.buttonWrapper}>
          {user && (
            <button className={styles.button}>
              <Link
                className={styles.buttonLink}
                href={`/messages/${chatHrefConstructor(user, profile)}`}
              >
                Message {profile.first_name}
              </Link>
            </button>
          )}
          <button className={`${styles.button} ${styles.buttonAlt}`}>
            <Link className={styles.buttonLink} href={`/${profile.username}`}>
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
