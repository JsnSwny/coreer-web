import styles from "./ProfileBanner.module.scss";
import Container from "../../Container/Container";
import LargeContainer from "@/components/Container/LargeContainer";
import { Profile } from "@/interfaces/profile.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, ChangeEvent } from "react";
import { server } from "@/config";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { chatHrefConstructor } from "@/utils/chatHrefConstructor";
import Button from "@/components/Button/Button";
import { likeUser } from "@/utils/likeUser";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import ResponseBanner from "./ResponseBanner/ResponseBanner";

interface ProfileBannerProps {
  profile: Profile;
  openModal: (section: string, description?: string, item?: object) => void;
}

const ProfileBanner = ({ profile, openModal }: ProfileBannerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
    profile.profile_photo ? profile.profile_photo : profile.image
  );
  const { user, updateProfilePicture, userToken } = useAuth();

  useEffect(() => {
    setImagePreviewUrl(
      profile.profile_photo ? profile.profile_photo : profile.image
    );
  }, [profile]);

  const photoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files?.[0] as File | undefined;
    if (file) {
      reader.onloadend = () => {
        updateProfilePicture(user!.id, userToken!, file);
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.content}>
          {imagePreviewUrl && (
            <img className={styles.profilePhoto} src={imagePreviewUrl} />
          )}
          {profile.id == user!.id && (
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
          )}
        </div>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>
            {profile.first_name} {profile.last_name}
          </h1>
          {profile.id == user!.id && (
            <FontAwesomeIcon
              icon={faPencil}
              className={styles.titleIcon}
              onClick={() => openModal("Details")}
            />
          )}
        </div>

        <p className={styles.subtitle}>
          {profile.current_level?.name} {/*• BSc Computer Science*/}
        </p>
        <p className={styles.location}>{profile.location}</p>
        <p className={styles.bio}>{profile.bio}</p>
        {/* <ResponseBanner /> */}
        {user && profile.id != user.id && (
          <div className={styles.buttons}>
            <Button
              text="Message"
              link={`/messages/${chatHrefConstructor(user, profile)}`}
              size="small"
              alt={true}
              icon={faEnvelope}
            />
            <Button
              text={user!.following.includes(profile!.id) ? "Remove" : "Like"}
              alt={!user!.following.includes(profile!.id)}
              onClick={() => {
                likeUser(user!, profile, userToken!);
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              size="small"
              icon={
                isHovered || user!.following.includes(profile.id)
                  ? faStar
                  : farStar
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileBanner;
