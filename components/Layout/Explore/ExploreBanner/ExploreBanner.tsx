import Container from "@/components/Container/Container";
import styles from "./ExploreBanner.module.scss";

const ExploreBanner = () => {
  return (
    <div className={styles.banner}>
      <Container size="large">
        <img
          className={styles.logo}
          alt="CodeClan logo"
          src="https://coreer-static.s3.eu-west-2.amazonaws.com/media/uploads/CodeClan-Logo-Pride.png"
        />
        <h1 className={styles.banner__tagline}>
          Discover projects from our talented students.
        </h1>
      </Container>
    </div>
  );
};

export default ExploreBanner;
