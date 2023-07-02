import TagsList from "@/components/Tags/TagsList/TagsList";
import styles from "./ProfilePreview.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import { faMessage, faStar } from "@fortawesome/free-solid-svg-icons";
import { Profile } from "@/interfaces/profile.model";
import ProfilePreviewSidebar from "./ProfilePreviewSidebar/ProfilePreviewSidebar";
import Projects from "../Projects/Projects/Projects";
import { Project } from "@/interfaces/project.model";

interface ProfilePreviewProps {
  profile: Profile;
  openProjectModal: (project: Project) => void;
}

const ProfilePreview = ({ profile, openProjectModal }: ProfilePreviewProps) => {
  console.log(openProjectModal);
  const { user } = useAuth();
  return (
    <div className={styles.container}>
      <ProfilePreviewSidebar profile={profile} />
      <div className={styles.main}>
        <section className={styles.section}>
          <h3 className={styles.section__heading}>Projects</h3>
          <Projects
            projects={profile.projects}
            action={() => {}}
            isProfile
            showEdit={user ? profile.id == user!.id : false}
            openProjectModal={openProjectModal}
            sortByEndDate
          />
        </section>
        <section className={styles.section}>
          <h3 className={styles.section__heading}>Work Experience</h3>
        </section>
        <div className={styles.actions}>
          <Button text="Save" alt icon={faStar} />
          <Button text="Message" icon={faMessage} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
