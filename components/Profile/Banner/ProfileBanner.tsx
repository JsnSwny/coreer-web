import styles from "./ProfileBanner.module.scss";
import Container from "../../Container/Container";

interface ProfileBannerProps {
  photo: string;
}

const ProfileBanner = ({ photo }: ProfileBannerProps) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.banner}
        src="https://www.pixel4k.com/wp-content/uploads/2018/11/night-city-skyscraper-skyline-night-new-york-usa-4k_1541972184.jpg"
      />
      <Container>
        <img className={styles.profilePhoto} src={photo} />
      </Container>
    </div>
  );
};

export default ProfileBanner;
