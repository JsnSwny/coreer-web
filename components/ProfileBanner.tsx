import styles from "@/styles/ProfileBanner.module.scss";
import Container from "./Container";

const ProfileBanner = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.banner}
        src="https://www.pixel4k.com/wp-content/uploads/2018/11/night-city-skyscraper-skyline-night-new-york-usa-4k_1541972184.jpg"
      />
      <Container>
        <img
          className={styles.profilePhoto}
          src="https://images.pexels.com/photos/5119214/pexels-photo-5119214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </Container>
    </div>
  );
};

export default ProfileBanner;
