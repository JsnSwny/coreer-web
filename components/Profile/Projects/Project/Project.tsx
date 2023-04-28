import styles from "./Project.module.scss";
import { Project } from "@/interfaces/project.model";
import { format, parseISO } from "date-fns";
import TagsList from "@/components/Tags/TagsList/TagsList";

interface ProjectProps {
  project: Project;
}

const Project = ({ project }: ProjectProps) => {
  const formatDate = (date: string) => {
    return format(parseISO(date), "d MMM yyyy");
  };

  return (
    <div className={styles.container}>
      <div className={styles.placeholder}>
        {project.image && <img className={styles.image} src={project.image} />}
        <p className={styles.date}>
          {`${formatDate(project.start_date)} ${
            project.end_date ? `- ${project.end_date}` : ""
          }`}
        </p>
        <h3 className={styles.title}>{project.title.split("/")[1]}</h3>
        <p className={styles.description}>{project.description}</p>
      </div>
      {project.languages.length > 0 && (
        <TagsList
          tags={project.languages.map((item) => ({ text: item.name }))}
        />
      )}
    </div>
  );
};

export default Project;
