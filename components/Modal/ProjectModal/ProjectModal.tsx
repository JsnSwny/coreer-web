import Button from "@/components/Button/Button";
import { Project } from "@/interfaces/project.model";
import { faRobot, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProjectModal.module.scss";
import { useState } from "react";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose, isOpen }: ProjectModalProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.placeholder}>
          {project.image && (
            <img className={styles.image} src={project.image} />
          )}
          {!project.image && (
            <FontAwesomeIcon
              icon={faRobot}
              className={styles.placeholderIcon}
            />
          )}
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className={styles.modalHeader}>
          <div>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
          </div>
          <div className={styles.buttons}>
            <Button text="Repo" alt={true} />
            <Button text="View Project" />
          </div>
        </div>

        <div className={styles.modalBody}>
          <div dangerouslySetInnerHTML={{ __html: project.content }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
