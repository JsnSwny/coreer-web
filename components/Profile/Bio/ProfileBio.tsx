import styles from "./ProfileBio.module.scss";

import Button from "../../Button/Button";
import Link from "next/link";
import { Profile } from "@/interfaces/profile.model";
import { chatHrefConstructor } from "@/utils/chatHrefConstructor";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileBioProps {
  profile: Profile;
}

const ProfileBio = ({ profile }: ProfileBioProps) => {
  const { user } = useAuth();
  return (
    <>
      <section className={styles.container}>
        <h4>About</h4>
        <div className={styles.bio}>
          <p>{profile.bio}</p>
        </div>
        <Link
          href={`/messages/${chatHrefConstructor(user, profile)}`}
          className={styles.cta}
        >
          <Button text={`Message ${profile.first_name}`} />
        </Link>
      </section>
    </>
  );
};

export default ProfileBio;
