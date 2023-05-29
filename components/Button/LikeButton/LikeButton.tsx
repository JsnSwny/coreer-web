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
  const handleClick = (event) => {
    event.preventDefault();
    toast(`You liked ${profile.first_name} ${profile.last_name}!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    likeUser(user, profile, userToken);
  };

  const { userToken, user } = useAuth();

  return (
    <FontAwesomeIcon
      icon={isHovered || user.following.includes(profile.id) ? faStar : farStar}
      className={`${className} ${styles.likeButton} ${
        isHovered || user.following.includes(profile.id)
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
