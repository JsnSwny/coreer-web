import React, { useState, useEffect } from "react";
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
import withAuth from "@/components/Route/withAuth";
import AboutSection from "@/components/Profile/About/AboutSection/AboutSection";
import Modal from "@/components/Modal/Modal/Modal";
import { useAuth } from "@/contexts/AuthContext";
import AboutModalForm from "@/components/Modal/Forms/AboutModalForm/AboutModalForm";
import ProfileCardList from "@/components/Card/ProfileCardList/ProfileCardList";
import ProfileCard from "@/components/Card/ProfileCard/ProfileCard";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddProjectModalForm from "@/components/Modal/Forms/AddProjectModalForm/AddProjectModalForm";
import axios from "axios";

interface ProfileProps {
  profile: Profile | null;
}

const profile = ({ profile }: ProfileProps) => {
  const { updateUser, user } = useAuth();

  profile = user.id == profile.id ? user : profile;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const openModal = (section: string) => {
    setActiveSection(section);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${server}/recommend/6/${profile.id}`)
      .then((res) => setRecommendations(res.data.recommendations));
  }, []);

  return (
    <>
      <Head>
        <title>{`${profile.first_name} ${profile.last_name} | coreer`}</title>
      </Head>
      <Container>
        <ProfileBanner profile={profile} />

        <Modal title={activeSection} isOpen={isModalOpen} onClose={closeModal}>
          {activeSection === "About" && (
            <AboutModalForm closeModal={closeModal} />
          )}
          {activeSection === "Add Project" && (
            <AddProjectModalForm closeModal={closeModal} />
          )}
          {activeSection === "address" && <AddressSectionForm />}
        </Modal>
        <div className={styles.container}>
          <ProfileSection
            title="About"
            action={() => openModal("About")}
            profile={profile}
          >
            <AboutSection profile={profile} />
          </ProfileSection>

          <ProfileSection
            title={"Skills"}
            action={() => openModal("section")}
            profile={profile}
          >
            <LanguageList languages={profile.languages} />
          </ProfileSection>

          <ProfileSection
            title={"Projects"}
            profile={profile}
            action={() => openModal("Add Project")}
            actionIcon={faPlus}
          >
            <Projects projects={profile.projects} />
          </ProfileSection>
          <ProfileSection title={"Work Experience"} profile={profile}>
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
          <ProfileSection title={"Education"} profile={profile}>
            {/* <CardList>
              {profile.educations.map((education) => (
                <Card
                  image={education.school.logo}
                  title={education.school.name}
                  subtitle={education.degree}
                  body="Lorem ipsum dolor sit amet consectetur. Tempor dui vulputate netus facilisis vel."
                />
              ))}
            </CardList> */}
          </ProfileSection>
          <ProfileSection title={"Reviews"} profile={profile}>
            <CardList>
              <Card
                image="http://www.gurunepal.com/wp-content/uploads/2020/05/heriot-watt-1-1.png"
                title="Sarah Wilson"
                subtitle="Web Developer @ Microsoft"
                body="John is a brilliant machine learning engineer who consistently delivers high-quality work. He is an excellent team player who is always willing to help his colleagues and share his knowledge with them.”"
              />
            </CardList>
          </ProfileSection>
          <ProfileSection
            title={`Similar to ${profile.first_name}`}
            profile={profile}
          >
            <ProfileCardList>
              {recommendations.slice(1, 5).map((item) => (
                <ProfileCard profile={item} />
              ))}
            </ProfileCardList>
          </ProfileSection>
        </div>
        {/* </div>
          <Suggestions user={profile} suggestions={recommend} /> */}
      </Container>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const res = await fetch(`${server}/api/profiles/${context?.params?.id}`);
  const profile = await res.json();

  return {
    props: {
      profile,
    },
  };
};

export default withAuth(profile);
