import { format } from "date-fns";
import React from "react";
import styles from "./Project.module.scss";
import { Profile } from "@/interfaces/profile.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import TagsList from "@/components/Tags/TagsList/TagsList";
import Link from "next/link";
import LikeButton from "@/components/Button/LikeButton/LikeButton";
import globalStyles from "@/styles/globalStyles.module.scss";

const ProjectPlaceholder = () => {
  return (
    <div className={`${styles.container} ${styles.large}`}>
      <div
        className={`${globalStyles.placeholderWhite} ${styles.placeholder}`}
      ></div>
      <div
        className={`${globalStyles.placeholderWhite} ${styles.titlePlaceholder}`}
      ></div>
      <div className={styles.profile}>
        <div
          className={`${globalStyles.placeholderWhite} ${styles.imagePlaceholder}`}
        ></div>
        <div
          className={`${globalStyles.placeholderWhite} ${styles.namePlaceholder}`}
        ></div>
      </div>

      {/* {project.languages && project.languages.length > 0 && (
				<TagsList
					tags={project.languages.map((item) => ({
						text: item.name,
						highlight: user?.languages.some((lang) => item.id == lang.id),
					}))}
					fade
				/>
			)} */}
    </div>
  );
};

export default ProjectPlaceholder;
