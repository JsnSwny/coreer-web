import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import styles from "./LikeButton.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { server } from "@/config";
import { Profile } from "@/interfaces/profile.model";
import { likeUser } from "@/utils/likeUser";
import { toast, ToastContainer } from "react-toastify";

interface LikeButtonProps {
  profile: Profile;
  className?: string;
  alt?: boolean;
}

const LikeButton = ({ profile, className, alt }: LikeButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { userToken, user } = useAuth();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    likeUser(user!, profile, userToken!);
  };

  return (
    <FontAwesomeIcon
      icon={
        isHovered || user!.following.includes(profile.id) ? faStar : farStar
      }
      className={`${className} ${styles.likeButton} ${
        isHovered || user!.following.includes(profile.id)
          ? styles.solid
          : styles.regular
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    />
  );
};

export default LikeButton;
