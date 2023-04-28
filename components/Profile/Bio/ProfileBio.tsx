import styles from "./ProfileBio.module.scss";

import Button from "../../Button/Button";
import Link from "next/link";
import { Profile } from "@/interfaces/profile.model";

interface ProfileBioProps {
  user: Profile;
}

const ProfileBio = ({ user }: ProfileBioProps) => {
  return (
    <>
      <section className={styles.container}>
        <h4>About</h4>
        <div className={styles.bio}>
          <p>{user.bio}</p>
        </div>
        <Link href={`/message/1`} className={styles.cta}>
          <Button text={`Message ${user.first_name}`} />
        </Link>
      </section>
    </>
  );
};

export default ProfileBio;
