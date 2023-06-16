import { useAuth } from "@/contexts/AuthContext";
import { Profile } from "@/interfaces/profile.model";
import { likeUser } from "@/utils/likeUser";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./LikeButton.module.scss";

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
      icon={isHovered || user!.following.includes(profile.id) ? faStar : farStar}
      className={`${className} ${styles.likeButton} ${
        isHovered || user!.following.includes(profile.id) ? styles.solid : styles.regular
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    />
  );
};

export default LikeButton;
