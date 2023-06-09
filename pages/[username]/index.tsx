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
import CriteriaList from "@/components/Profile/Criteria/CriteriaList/CriteriaList";
import Nav from "@/components/Profile/Nav/Nav";

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

  const [section, setSection] = useState("Projects");

  const openModal = (section: string, description: string = "", item?: any) => {
    setActiveSection({ title: section, description });
    if (item) setModalItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalItem(null);
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
        <Container margin>
          <ProfileBanner profile={profile} />
          <CriteriaList profile={profile} />
          <Nav section={section} setSection={setSection} />

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
                <ProjectModalForm closeModal={closeModal} item={modalItem} />
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
          {section == "Projects" && (
            <Projects
              projects={profile.projects}
              action={openModal}
              profile={profile}
            />
          )}
          {section == "Similar Users" && (
            <ProfileCardList>
              {recommendations.slice(1, 5).map((item) => (
                <ProfileCard profile={item} />
              ))}
            </ProfileCardList>
          )}

          {section == "About" && (
            <AboutSection profile={profile} openModal={openModal} />
          )}
        </Container>
      </>
    );
  }
};

export const getServerSideProps = async (context: any) => {
  const res = await fetch(
    `${server}/api/profiles/${context?.params?.username}/`
  );
  const profile = await res.json();

  return {
    props: {
      profile,
    },
  };
};

export default withAuth(profile);
