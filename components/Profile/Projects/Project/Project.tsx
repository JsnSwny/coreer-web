import styles from "./Project.module.scss";
import { Project } from "@/interfaces/project.model";
import { format } from "date-fns";
import TagsList from "@/components/Tags/TagsList/TagsList";

interface ProjectProps {
  project: Project;
}

const Project = ({ project }: ProjectProps) => {
  console.log(project)
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={project.image}
      />
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.date}>
        {`${project.start_date} - ${project.end_date}`}
      </p>
      <p className={styles.description}>{project.description}</p>
      <TagsList tags={project.languages.map(item => ({text: item.name}))} />
    </div>
  );
};

export default Project;
