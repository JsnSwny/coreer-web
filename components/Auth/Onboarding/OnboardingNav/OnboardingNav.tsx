import { faContactBook } from "@fortawesome/free-solid-svg-icons";
import styles from "./OnboardingNav.module.scss";
import OnboardingNavItem from "./OnboardingNavItem";
import { faPersonBiking } from "@fortawesome/free-solid-svg-icons";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";

const OnboardingNav = () => {
  return (
    <ul className={styles.nav}>
      <OnboardingNavItem
        title={"Personal Details"}
        link={"personal-details"}
        icon={faContactBook}
        step={1}
      />
      <OnboardingNavItem
        title={"Interests"}
        link={"interests"}
        icon={faPersonBiking}
        step={2}
      />
      <OnboardingNavItem
        title={"Languages"}
        link={"languages"}
        icon={faTerminal}
        step={3}
      />
    </ul>
  );
};

export default OnboardingNav;
