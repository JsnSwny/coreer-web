import { Profile } from "@/interfaces/profile.model";
import styles from "./TopMatchBanner.module.scss";
import Link from "next/link";
import TagsList from "@/components/Tags/TagsList/TagsList";
import LikeButton from "@/components/Button/LikeButton/LikeButton";
import { chatHrefConstructor } from "@/utils/chatHrefConstructor";
import { useAuth } from "@/contexts/AuthContext";
import globalStyles from "@/styles/globalStyles.module.scss";

const TopMatchBannerPlaceholder = () => {
  const { user } = useAuth();
  return (
    <div className={styles.banner}>
      <div className={styles.left}>
        <div
          className={`${globalStyles.placeholderBlue} ${styles.image}`}
        ></div>
        {/* <LikeButton profile={profile} /> */}
        <div className={styles.details}>
          <div
            className={`${globalStyles.placeholderBlue} ${styles.titlePlaceholder}`}
          ></div>
          <div
            className={`${globalStyles.placeholderBlue} ${styles.jobPlaceholder}`}
          ></div>
        </div>
        <span className={styles.verticalRule}></span>
      </div>
      <div className={styles.right}>
        <div
          className={`${globalStyles.placeholderBlue} ${styles.contentPlaceholder}`}
        ></div>
      </div>
    </div>
  );
};

export default TopMatchBannerPlaceholder;
