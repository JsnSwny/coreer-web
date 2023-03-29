import styles from "./Projects.module.scss";
import Project from "../Project/Project";
import { Project as ProjectModel } from "@/interfaces/project.model";

interface ProjectsProps {
  projects: ProjectModel[]
}

const Projects = ({projects}: ProjectsProps) => {
  console.log(projects)
  return (
    <div className={styles.container}>
      {projects.map(project => <Project project={project} />)}
    </div>
  );
};

export default Projects;
