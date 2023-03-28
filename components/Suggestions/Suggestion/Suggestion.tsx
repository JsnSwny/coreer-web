import Link from "next/link";
import styles from "./Suggestion.module.scss";
import Button from "@/components/Button/Button";
import { Profile } from "@/interfaces/profile.model";

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
        </div>
      </div>
      <Button text={"View"} variant="pill" />
    </Link>
  );
};

export default Suggestion;
