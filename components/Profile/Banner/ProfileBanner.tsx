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
import Link from "next/link";
import { chatHrefConstructor } from "@/utils/chatHrefConstructor";
import Button from "@/components/Button/Button";
import { likeUser } from "@/utils/likeUser";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

interface ProfileBannerProps {
  profile: Profile;
}

const ProfileBanner = ({ profile }: ProfileBannerProps) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<
    string | ArrayBuffer | null
  >(profile.profile_photo ? profile.profile_photo : profile.image);
  const { user, updateProfilePicture, userToken } = useAuth();

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
        <div>
          <h1 className={styles.title}>
            {profile.first_name} {profile.last_name}
          </h1>
          <p className={styles.subtitle}>{profile.job}</p>
        </div>

        <div className={styles.buttons}>
          <Button
            text="Message"
            link={`/messages/${chatHrefConstructor(user, profile)}`}
            size="small"
            alt={true}
            icon={faEnvelope}
          />
          <Button
            text="Like"
            onClick={() => likeUser(user, profile, userToken)}
            size="small"
            icon={faStar}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
