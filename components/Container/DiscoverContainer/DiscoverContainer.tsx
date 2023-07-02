import ProfilePreview from "@/components/Profile/ProfilePreview/ProfilePreview";
import styles from "./DiscoverContainer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Container from "../Container";
import { Profile } from "@/interfaces/profile.model";
import { useState, useEffect } from "react";
import axios from "axios";
import { server } from "@/config";
import { Project } from "@/interfaces/project.model";

interface DiscoverContainerProps {
  openProjectModal: (project: Project) => void;
}

const DiscoverContainer = ({ openProjectModal }: DiscoverContainerProps) => {
  console.log(openProjectModal);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`${server}/api/user/`).then((res) => {
      setProfiles(res.data.results);
      setLoading(false);
      setCurrentProfile(res.data.results[currentIndex]);
      console.log(res.data);
    });
  }, []);
  return (
    <div className={styles.container}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className={`${styles.icon} ${
          currentIndex == 0 ? styles.iconDisabled : ""
        }`}
        onClick={() => {
          setCurrentProfile(profiles[currentIndex - 1]);
          setCurrentIndex(currentIndex - 1);
        }}
      />
      <Container>
        {currentProfile && (
          <ProfilePreview
            openProjectModal={openProjectModal}
            profile={currentProfile}
          />
        )}
      </Container>

      <FontAwesomeIcon
        icon={faArrowRight}
        className={styles.icon}
        onClick={() => {
          console.log(profiles);
          console.log(currentIndex);
          console.log(profiles[currentIndex + 1]);
          setCurrentProfile(profiles[currentIndex + 1]);
          setCurrentIndex(currentIndex + 1);
        }}
      />
    </div>
  );
};

export default DiscoverContainer;
