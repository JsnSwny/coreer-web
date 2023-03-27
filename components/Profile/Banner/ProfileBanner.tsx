import styles from "./ProfileBanner.module.scss";
import Container from "../../Container/Container";

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
          src="https://media.licdn.com/dms/image/C5603AQGIOaYx13z5qg/profile-displayphoto-shrink_800_800/0/1636068317262?e=1685577600&v=beta&t=TtixrGFDFMlOst8NsDdxMFii0w_dEPyNSucaUPfFQqo"
        />
      </Container>
    </div>
  );
};

export default ProfileBanner;
