import styles from "./ExploreHeading.module.scss";

const ExploreHeading = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Welcome Back, Jason</h1>
      <p className={styles.subtitle}>
        You have <span className={styles.bold}>3 connects</span> remaining for
        today
      </p>
    </header>
  );
};

export default ExploreHeading;
