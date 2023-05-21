import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import styles from "./LikeButton.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { server } from "@/config";
import { Profile } from "@/interfaces/profile.model";

interface LikeButtonProps {
  profile: Profile;
}

const LikeButton = ({ profile }: LikeButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = (event) => {
    event.preventDefault();
    likeUser();
  };

  const { userToken, user } = useAuth();

  const likeUser = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    config.headers["Authorization"] = `Token ${userToken}`;
    let newLikes = user.following;

    user.following.includes(profile.id)
      ? axios
          .delete(`${server}/api/follow/`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${userToken}`,
            },
            data: { following_id: profile.id },
          })

          .catch((err) => console.log(err.response))
      : axios
          .post(
            `${server}/api/follow/`,
            {
              following_id: profile.id,
            },
            config
          )

          .catch((err) => console.log(err.response));

    if (user.following.includes(profile.id)) {
      newLikes = [...newLikes.filter((item) => item != profile.id)];
    } else {
      newLikes.push(profile.id);
    }

    user.following = newLikes;
  };

  return (
    <FontAwesomeIcon
      icon={isHovered || user.following.includes(profile.id) ? faStar : farStar}
      className={`${styles.likeButton} ${
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
