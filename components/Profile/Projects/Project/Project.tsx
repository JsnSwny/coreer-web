import styles from "./Project.module.scss";
import { Project } from "@/interfaces/project.model";
import { format, parseISO } from "date-fns";
import TagsList from "@/components/Tags/TagsList/TagsList";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPencil, faRobot } from "@fortawesome/free-solid-svg-icons";
import { calculateTimeDifference } from "@/utils/calculateTimeDifference";

interface ProjectProps {
  project: Project;
  openProjectModal: () => void;
  action: (title: string, description: string, item: Project) => void;
}

const Project = ({ project, openProjectModal, action }: ProjectProps) => {
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
        className={styles.placeholder}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {project.image && <img className={styles.image} src={project.image} />}
        {!project.image && (
          <FontAwesomeIcon icon={faRobot} className={styles.placeholderIcon} />
        )}
        <div
          className={styles.editWrapper}
          onClick={(e) => {
            e.stopPropagation();
            action("Project", "", project);
          }}
        >
          <FontAwesomeIcon icon={faPencil} className={styles.editIcon} />
        </div>
      </div>
      {project.start_date && (
        <p className={styles.date}>
          {`${format(parseISO(project.start_date), "MMMM yyyy")} - ${
            project.end_date
              ? format(parseISO(project.end_date), "MMMM yyyy")
              : "Present"
          }`}{" "}
          ({calculateTimeDifference(project.start_date, project.end_date)})
        </p>
      )}
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.description}>{project.description}</p>
      {project.languages && project.languages.length > 0 && (
        <TagsList
          tags={project.languages.map((item) => ({ text: item.name }))}
        />
      )}
    </div>
  );
};

export default Project;
