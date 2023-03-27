import styles from "@/styles/ProfileBio.module.scss";
import Head from "next/head";
import Button from "./Button";
import Link from "next/link";
import { Profile } from "@/interfaces/profile.model";

interface ProfileBioProps {
  user: Profile;
}

const ProfileBio = ({user}: ProfileBioProps) => {
  return (
    <>
      <Head>
        <title>
          {user.first_name} {user.last_name} | coreer
        </title>
      </Head>
      <section className={styles.container}>
        <h1 className={styles.title}>
          {user.first_name} {user.last_name}
        </h1>
        <p className={styles.subtitle}>Web Developer</p>
        <div className={styles.bio}>
          <p>
            Lorem ipsum dolor sit amet consectetur. Elementum blandit aliquam
            ante sed aliquam risus ut tempus sapien. Quam sit enim tellus leo
            parturient lacus at cursus fusce. Nam lectus vestibulum porta
            porttitor facilisi dolor et amet. Ac vel cum sollicitudin varius
            duis phasellus. Commodo.
          </p>
        </div>
        <Link href={`/message/1`} className={styles.cta}>
          <Button text={"Message"} />
        </Link>
      </section>
    </>
  );
};

export default ProfileBio;
