import styles from "./Project.module.scss";
import { Project } from "@/interfaces/project.model";
import { format } from "date-fns";
import TagsList from "@/components/Tags/TagsList/TagsList";

interface ProjectProps {
  project: Project;
}

const Project = ({ project }: ProjectProps) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src="https://cdn.dribbble.com/userupload/5769214/file/original-331bc82c7d359aabb09eaf9d574d7ea6.png?compress=1&resize=1024x768"
      />
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.date}>
        {format(project.start_date, "dd/mm/yyyy")} -{" "}
        {format(project.end_date, "dd/mm/yyyy")}
      </p>
      <p className={styles.description}>{project.description}</p>
      <TagsList tags={project.tags} />
    </div>
  );
};

export default Project;
