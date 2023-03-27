import React from "react";
import { Profile } from "../../../interfaces/profile.model";
import { server } from "@/config";
import Image from "next/image";
import ProfileBanner from "@/components/ProfileBanner";
import Container from "@/components/Container";
import ProfileBio from "@/components/ProfileBio";
import Suggestions from "@/components/Suggestions";
import styles from "@/styles/Profile.module.scss";

interface ProfileProps {
  profile: Profile;
}

const profile = ({ profile }: ProfileProps) => {
  return (
    <div>
      <ProfileBanner />
      <Container>
      <div className={styles.topContainer}>
        <ProfileBio
          user={profile}
        />
        <Suggestions user={profile} />
      </div>
      <hr className={styles.divider} />

      </Container>
    </div>
  );
};

export const getStaticProps = async (context: any) => {
  const res = await fetch(`${server}/api/profiles/${context?.params?.id}`);

  const profile = await res.json();

  return {
    props: {
      profile,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/profiles`);

  const profiles = await res.json();

  const ids = profiles.map((profile: Profile) => profile.id);
  const paths = ids.map((id: number) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export default profile;
