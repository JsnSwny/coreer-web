import { Profile } from "@/interfaces/profile.model";
import ProfileBanner from "../../Banner/ProfileBanner";
import styles from "./AboutSection.module.scss";
import AboutDetails from "../AboutDetails/AboutDetails";

interface AboutSectionProps {
  profile: Profile;
}

const AboutSection = ({ profile }: AboutSectionProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div>
          <div className={styles.about}>
            <p>{profile.bio}</p>
          </div>
        </div>
        <AboutDetails profile={profile} />
      </div>
    </section>
  );
};

export default AboutSection;
