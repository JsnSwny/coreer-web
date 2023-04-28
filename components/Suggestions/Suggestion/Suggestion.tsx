import Link from "next/link";
import styles from "./Suggestion.module.scss";
import Button from "@/components/Button/Button";
import { Profile } from "@/interfaces/profile.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface SuggestionProps {
  profile: Profile;
}

const Suggestion = ({ profile }: SuggestionProps) => {
  return (
    <Link href={`/profile/${profile.id}`} className={styles.container}>
      <div className={styles.leftWrapper}>
        <img className={styles.image} src={profile.profile_photo} />
        <div className={styles.content}>
          <h4 className={styles.title}>{profile.first_name}</h4>
          <p className={styles.subtitle}>{profile.job}</p>
          <p className={styles.bio}>{profile.bio}</p>
        </div>
      </div>
      <FontAwesomeIcon icon={faAngleRight} className={styles.button} />
    </Link>
  );
};

export default Suggestion;
