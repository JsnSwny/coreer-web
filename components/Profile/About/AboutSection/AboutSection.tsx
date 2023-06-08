import { Profile } from "@/interfaces/profile.model";
import ProfileBanner from "../../Banner/ProfileBanner";
import styles from "./AboutSection.module.scss";
import QuestionsList from "../QuestionsList/QuestionsList";
import ProfileSection from "../../Section/ProfileSection";
import CardList from "@/components/Card/CardList/CardList";
import Card from "@/components/Card/Card/Card";
import { differenceInMonths } from "date-fns";
import {
  faBriefcase,
  faGraduationCap,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/contexts/AuthContext";

interface AboutSectionProps {
  profile: Profile;
  openModal: (section: string, description?: string, item?: object) => {};
}

const AboutSection = ({ profile, openModal }: AboutSectionProps) => {
  const { user } = useAuth();
  const showEdit = user!.id == profile.id;
  return (
    <section className={styles.container}>
      <QuestionsList user_answers={profile.user_answers} showEdit={showEdit} />
      <ProfileSection
        title="Work Experience"
        profile={profile}
        icon={faBriefcase}
        action={() => openModal("Experience")}
        actionIcon={faPlus}
      >
        <CardList>
          {profile?.work_experiences
            .slice()
            .sort((a, b) => {
              const endDateA = a.end_date ? new Date(a.end_date) : null;
              const endDateB = b.end_date ? new Date(b.end_date) : null;

              return differenceInMonths(
                endDateB || new Date(),
                endDateA || new Date()
              );
            })
            .map((experience) => (
              <Card
                image={null}
                title={experience.job_title}
                subtitle={experience.company}
                body={experience.description}
                start_date={experience.start_date}
                end_date={experience.end_date}
                size="large"
                action={() => openModal("Experience", "", experience)}
                showEdit={showEdit}
              />
            ))}
        </CardList>
      </ProfileSection>
      <ProfileSection
        title={"Education"}
        profile={profile}
        icon={faGraduationCap}
        action={() => openModal("Education")}
        actionIcon={faPlus}
      >
        <CardList>
          {profile?.educations
            .slice()
            .sort((a, b) => {
              const endDateA = a.end_date ? new Date(a.end_date) : null;
              const endDateB = b.end_date ? new Date(b.end_date) : null;

              return differenceInMonths(
                endDateB || new Date(),
                endDateA || new Date()
              );
            })
            .map((education) => (
              <Card
                image={education.school.logo}
                title={education.school.name}
                subtitle={education.degree}
                body={education.description}
                start_date={education.start_date}
                end_date={education.end_date}
                size="large"
                action={() => openModal("Education", "", education)}
                showEdit={showEdit}
              />
            ))}
        </CardList>
      </ProfileSection>
    </section>
  );
};

export default AboutSection;
