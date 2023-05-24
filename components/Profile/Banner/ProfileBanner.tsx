import styles from "./ProfileBanner.module.scss";
import Container from "../../Container/Container";
import LargeContainer from "@/components/Container/LargeContainer";
import { Profile } from "@/interfaces/profile.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { server } from "@/config";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileBannerProps {
  user: Profile;
}

const ProfileBanner = ({ user }: ProfileBannerProps) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(user.image);
  const { userToken, updateProfilePicture } = useAuth();

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setSelectedFile(file);
      updateProfilePicture(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bannerContainer}>
        <img
          className={styles.banner}
          src="https://www.pixel4k.com/wp-content/uploads/2018/11/night-city-skyscraper-skyline-night-new-york-usa-4k_1541972184.jpg"
        />
        <div className={styles.content}>
          <img className={styles.profilePhoto} src={imagePreviewUrl} />
          <label htmlFor="photo-upload" className={styles.changePhoto}>
            <FontAwesomeIcon
              icon={faCameraRetro}
              className={styles.changePhotoImage}
            />
            <input
              id="photo-upload"
              className={styles.fileInput}
              type="file"
              onChange={photoUpload}
            />
          </label>
        </div>
      </div>
      <div className={styles.details}>
        <h1 className={styles.title}>
          {user.first_name} {user.last_name}
        </h1>
        <p className={styles.subtitle}>{user.job}</p>
      </div>
    </div>
  );
};

export default ProfileBanner;
