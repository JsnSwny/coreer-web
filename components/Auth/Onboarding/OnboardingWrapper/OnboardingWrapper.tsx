import styles from "./OnboardingWrapper.module.scss";
import OnboardingNav from "../OnboardingNav/OnboardingNav";

interface OnboardingWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const OnboardingWrapper = ({
  title,
  description,
  children,
}: OnboardingWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.logo}>Coreer.</h3>
      <OnboardingNav />
      <div className={styles.content}>
        <div className={styles.header}></div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Imperdiet pulvinar eget id sed
          risus. A netus.
        </p>
        {children}
      </div>
    </div>
  );
};

export default OnboardingWrapper;
