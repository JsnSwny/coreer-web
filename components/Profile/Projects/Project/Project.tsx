import TagsList from "@/components/Tags/TagsList/TagsList";
import { Project } from "@/interfaces/project.model";
import { calculateTimeDifference } from "@/utils/calculateTimeDifference";
import { faPencil, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, parseISO } from "date-fns";
import { useRef } from "react";
import styles from "./Project.module.scss";

interface ProjectProps {
  project: Project;
  openProjectModal: () => void;
  action: (title: string, description: string, item: Project) => void;
  showEdit: boolean;
}

const Project = ({ project, openProjectModal, action, showEdit }: ProjectProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  return (
    <div className={styles.container} onClick={(e) => openProjectModal()}>
      <div
        className={`${styles.placeholder} ${showEdit ? styles.showEdit : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {project.image && <img className={styles.image} src={project.image} />}
        {!project.image && <FontAwesomeIcon icon={faRobot} className={styles.placeholderIcon} />}
        {showEdit && (
          <div
            className={styles.editWrapper}
            onClick={(e) => {
              e.stopPropagation();
              action("Project", "", project);
            }}
          >
            <FontAwesomeIcon icon={faPencil} className={styles.editIcon} />
          </div>
        )}
      </div>
      {project.start_date && (
        <p className={styles.date}>
          {`${format(parseISO(project.start_date), "MMMM yyyy")} - ${
            project.end_date ? format(parseISO(project.end_date), "MMMM yyyy") : "Present"
          }`}{" "}
          ({calculateTimeDifference(project.start_date, project.end_date)})
        </p>
      )}
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.description}>{project.description}</p>
      {project.languages && project.languages.length > 0 && (
        <TagsList tags={project.languages.map((item) => ({ text: item.name }))} />
      )}
    </div>
  );
};

export default Project;
