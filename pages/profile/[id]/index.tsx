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
import LanguageList from "@/components/Profile/Languages/LanguageList/LanguageList";
import Language from "@/components/Profile/Languages/Language/Language";

interface ProfileProps {
  profile: Profile;
  recommend: Profile[];
}

const profile = ({ profile, recommend }: ProfileProps) => {
  return (
    <>
      <Head>
        <title>{`${profile.first_name} ${profile.last_name} | coreer`}</title>
      </Head>
      <Container>
        <div className={styles.wrapper}>
          <div>
            <ProfileBanner user={profile} />
            <div className={styles.container}>
              <div className={styles.topContainer}>
                <ProfileBio user={profile} />
              </div>
              <hr className={styles.divider} />

              <ProfileSection title={"Skills"}>
                <LanguageList languages={profile.languages} />
              </ProfileSection>

              <hr className={styles.divider} />
              <ProfileSection title={"Projects"}>
                <Projects projects={profile.projects} />
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
                  {profile.educations.map((education) => (
                    <Card
                      image={education.school.logo}
                      title={education.school.name}
                      subtitle={education.degree}
                      body="Lorem ipsum dolor sit amet consectetur. Tempor dui vulputate netus facilisis vel."
                    />
                  ))}
                </CardList>
              </ProfileSection>

              <hr className={styles.divider} />
              <ProfileSection title={"Reviews"}>
                <CardList>
                  <Card
                    image="http://www.gurunepal.com/wp-content/uploads/2020/05/heriot-watt-1-1.png"
                    title="Sarah Wilson"
                    subtitle="Web Developer @ Microsoft"
                    body="John is a brilliant machine learning engineer who consistently delivers high-quality work. He is an excellent team player who is always willing to help his colleagues and share his knowledge with them.”"
                  />
                </CardList>
              </ProfileSection>
            </div>
          </div>
          <Suggestions user={profile} suggestions={recommend} />
        </div>
      </Container>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const res = await fetch(`${server}/api/profiles/${context?.params?.id}`);
  const profile = await res.json();

  const recommendationsRes = await fetch(
    `${server}/recommend/${context?.params?.id}/6`
  );

  let recommend = await recommendationsRes.json();

  return {
    props: {
      profile,
      recommend: recommend.recommendations,
    },
  };
};

export default profile;
