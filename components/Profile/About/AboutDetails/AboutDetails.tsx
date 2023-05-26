import { Profile } from "@/interfaces/profile.model";
import styles from "./AboutDetails.module.scss";

interface AboutDetailsProps {
  profile: Profile;
}

const AboutDetails = ({ profile }: AboutDetailsProps) => {
  return (
    <ul className={styles.details}>
      <li>
        <h4>Location</h4>
        <p>{profile.location}</p>
      </li>
      <li>
        <h4>LinkedIn</h4>
        <p>jsnswny</p>
      </li>
      <li>
        <h4>GitHub</h4>
        <p>JsnSwny</p>
      </li>
    </ul>
  );
};

export default AboutDetails;
