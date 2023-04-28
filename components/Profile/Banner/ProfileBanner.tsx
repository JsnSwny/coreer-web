import styles from "./ProfileBanner.module.scss";
import Container from "../../Container/Container";
import LargeContainer from "@/components/Container/LargeContainer";
import { Profile } from "@/interfaces/profile.model";

interface ProfileBannerProps {
  user: Profile;
}

const ProfileBanner = ({ user }: ProfileBannerProps) => {
  return (
    <div className={styles.container}>
      <LargeContainer>
        <img
            className={styles.banner}
            src="https://www.pixel4k.com/wp-content/uploads/2018/11/night-city-skyscraper-skyline-night-new-york-usa-4k_1541972184.jpg"
          />
          <div className={styles.content}>
          <img className={styles.profilePhoto} src={user.profile_photo} />
        </div>
      </LargeContainer>
      
      <Container>
        <div className={styles.details}>
          <h1 className={styles.title}>{user.first_name} {user.last_name}</h1>
          <p className={styles.subtitle}>{user.job}</p>
        </div>
      </Container>
    </div>
  );
};

export default ProfileBanner;
