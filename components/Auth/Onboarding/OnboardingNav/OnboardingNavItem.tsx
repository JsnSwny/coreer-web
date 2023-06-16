import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./OnboardingNavItem.module.scss";

interface OnboardingNavItemProps {
  title: string;
  link: string;
  icon: IconDefinition;
  step: number;
}

const OnboardingNavItem = ({ title, link, icon, step }: OnboardingNavItemProps) => {
  const router = useRouter();
  return (
    <li
      className={`${styles.navItem} ${
        router.pathname == `/onboarding/${link}` ? styles.active : ""
      }`}
    >
      <Link href={`/onboarding/${link}`} className={styles.link}>
        <FontAwesomeIcon icon={icon} className={styles.icon} />
        <div>
          <p className={styles.step}>Step {step}</p>
          <p className={styles.title}>{title}</p>
        </div>
      </Link>
    </li>
  );
};

export default OnboardingNavItem;
