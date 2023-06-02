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
import ProjectModalForm from "@/components/Modal/Forms/ProjectModalForm/ProjectModalForm";
import axios from "axios";
import EducationModalForm from "@/components/Modal/Forms/EducationModalForm/EducationModalForm";
import WorkModalForm from "@/components/Modal/Forms/WorkModalForm/WorkModalForm";
import SkillsModalForm from "@/components/Modal/Forms/SkillsModalForm/SkillsModalForm";
import { differenceInMonths } from "date-fns";

interface ProfileProps {
  profile: Profile | null;
}

interface ActiveSectionProps {
  title: string;
  description?: string;
}

const profile = ({ profile }: ProfileProps) => {
  const { updateUser, user } = useAuth();

  profile = user!.id == profile?.id ? user : profile;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [activeSection, setActiveSection] = useState<ActiveSectionProps | null>(
    null
  );
  const [recommendations, setRecommendations] = useState([]);

  const openModal = (section: string, description: string = "", item?: any) => {
    setActiveSection({ title: section, description });
    setModalItem(item)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (profile) {
      axios
        .get(`${server}/recommend/6/${profile.id}`)
        .then((res) => setRecommendations(res.data.recommendations));
    }
  }, []);

  if (!profile) {
    return <h1>Profile not found</h1>;
  } else {
    return (
      <>
        <Head>
          <title>{`${profile.first_name} ${profile.last_name} | coreer`}</title>
        </Head>
        <Container>
          <ProfileBanner profile={profile} />
          {activeSection && (
            <Modal
              title={activeSection.title}
              description={activeSection.description}
              isOpen={isModalOpen}
              onClose={closeModal}
            >
              {activeSection.title === "About" && (
                <AboutModalForm closeModal={closeModal} />
              )}
              {activeSection.title === "Project" && (
                <ProjectModalForm closeModal={closeModal} />
              )}
              {activeSection.title === "Education" && (
                <EducationModalForm closeModal={closeModal} item={modalItem} />
              )}
              {activeSection.title === "Experience" && (
                <WorkModalForm closeModal={closeModal} item={modalItem} />
              )}
              {activeSection.title === "Skills" && (
                <SkillsModalForm closeModal={closeModal} />
              )}
            </Modal>
          )}

          <div className={styles.container}>
            <ProfileSection
              title="About"
              action={() =>
                openModal("About", "Write a short summary about yourself")
              }
              profile={profile}
            >
              <AboutSection profile={profile} />
            </ProfileSection>

            <ProfileSection
              title={"Skills"}
              action={() =>
                openModal("Skills", "Select at least 5 programming languages")
              }
              profile={profile}
            >
              <LanguageList languages={profile.languages} />
            </ProfileSection>

            <ProfileSection
              title={"Projects"}
              profile={profile}
              action={() => openModal("Project")}
              actionIcon={faPlus}
            >
              <Projects projects={profile.projects} />
            </ProfileSection>
            <ProfileSection
              title={"Work Experience"}
              profile={profile}
              action={() => openModal("Experience")}
              actionIcon={faPlus}
            >
              <CardList>
                {profile?.work_experiences.slice()
                .sort((a, b) => {
                  const endDateA = a.end_date ? new Date(a.end_date) : null;
                  const endDateB = b.end_date ? new Date(b.end_date) : null;
                
                  return differenceInMonths(endDateB || new Date(), endDateA || new Date());
                }).map((experience) => (
                  <Card
                    image={null}
                    title={experience.company}
                    subtitle={experience.job_title}
                    body={experience.description}
                    start_date={experience.start_date}
                    end_date={experience.end_date}
                    size="large"
                    action={() => openModal("Experience", "", experience)}
                  />
                ))}
              </CardList>
            </ProfileSection>
            <ProfileSection
              title={"Education"}
              profile={profile}
              action={() => openModal("Education")}
              actionIcon={faPlus}
            >
              <CardList>
                {profile?.educations.slice()
                .sort((a, b) => {
                  const endDateA = a.end_date ? new Date(a.end_date) : null;
                  const endDateB = b.end_date ? new Date(b.end_date) : null;
                
                  return differenceInMonths(endDateB || new Date(), endDateA || new Date());
                }).map((education) => (
                  <Card
                    image={education.school.logo}
                    title={education.school.name}
                    subtitle={education.degree}
                    body={education.description}
                    start_date={education.start_date}
                    end_date={education.end_date}
                    size="large"
                    action={() => openModal("Education", "", education)}
                  />
                ))}
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
        </Container>
      </>
    );
  }
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
