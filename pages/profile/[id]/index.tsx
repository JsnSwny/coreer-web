import React from "react";
import { Profile } from "../../../interfaces/profile.model";
import { server } from "@/config";
import Image from "next/image";
import ProfileBanner from "@/components/Profile/Banner/ProfileBanner";
import Container from "@/components/Container/Container";
import ProfileBio from "@/components/Profile/Bio/ProfileBio";
import Suggestions from "@/components/Suggestions/Suggestions/Suggestions";
import styles from "@/components/Profile/Profile.module.scss";
import ProfileSection from "@/components/Profile/Section/ProfileSection";
import Head from "next/head";
import Projects from "@/components/Profile/Projects/Projects/Projects";
import CardList from "@/components/Card/CardList/CardList";
import Card from "@/components/Card/Card/Card";

interface ProfileProps {
  profile: Profile;
}

const profile = ({ profile }: ProfileProps) => {
  return (
    <>
      <Head>
        <title>{`${profile.first_name} ${profile.last_name} | coreer`}</title>
      </Head>
      <div>
        <ProfileBanner />
        <Container>
          <div className={styles.topContainer}>
            <ProfileBio user={profile} />
            <Suggestions user={profile} />
          </div>
          <hr className={styles.divider} />
          <ProfileSection title={"Projects"}>
            <Projects />
          </ProfileSection>
          <hr className={styles.divider} />
          <ProfileSection title={"Work Experience"}>
            <CardList>
              <Card
                image="http://www.gurunepal.com/wp-content/uploads/2020/05/heriot-watt-1-1.png"
                title="Apple"
                subtitle="iOS Developer"
                body="Develop and maintain iOS applications
                  Ensure high quality and meet company standards
                  Work on both internal and external applications
                  Work with programming languages such as Swift and Objective-C"
                start_date={new Date()}
                end_date="Present"
              />
            </CardList>
          </ProfileSection>
          <hr className={styles.divider} />
          <ProfileSection title={"Education"}>
            <CardList>
              <Card
                image="http://www.gurunepal.com/wp-content/uploads/2020/05/heriot-watt-1-1.png"
                title="Heriot-Watt University"
                subtitle="BSc Computer Science"
                body="Lorem ipsum dolor sit amet consectetur. Tempor dui vulputate netus facilisis vel."
              />
            </CardList>
          </ProfileSection>

          <hr className={styles.divider} />

          <ProfileSection title={"Languages and Tools"}>
            {/* <LanguageList>
              <Language
                image="http://www.gurunepal.com/wp-content/uploads/2020/05/heriot-watt-1-1.png"
                title="Heriot-Watt University"
                subtitle="BSc Computer Science"
                body="Lorem ipsum dolor sit amet consectetur. Tempor dui vulputate netus facilisis vel."
              />
            </LanguageList> */}
          </ProfileSection>
        </Container>
      </div>
    </>
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
