import styles from "@/styles/ProfileBio.module.scss";
import Head from "next/head";

interface ProfileBioProps {
  first_name: string;
  last_name: string;
}

const ProfileBio = ({ first_name, last_name }: ProfileBioProps) => {
  return (
    <>
      <Head>
        <title>
          {first_name} {last_name} | coreer
        </title>
      </Head>
      <section className={styles.container}>
        <h1 className={styles.title}>
          {first_name} {last_name}
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
      </section>
    </>
  );
};

export default ProfileBio;
