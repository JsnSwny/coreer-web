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
        <h1 className={styles.title}>
          {user.first_name} {user.last_name}
        </h1>
        <p className={styles.subtitle}>{user.job}</p>
        <div className={styles.bio}>
          <p>{user.bio}</p>
        </div>
        <Link href={`/message/1`} className={styles.cta}>
          <Button text={"Message"} />
        </Link>
      </section>
    </>
  );
};

export default ProfileBio;
