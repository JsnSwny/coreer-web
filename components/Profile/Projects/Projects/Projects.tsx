import styles from "./Projects.module.scss";
import Project from "../Project/Project";
import { Project as ProjectModel } from "@/interfaces/project.model";
import { differenceInMonths } from "date-fns";

interface ProjectsProps {
  projects: ProjectModel[]
}

const Projects = ({projects}: ProjectsProps) => {
  return (
    <div className={styles.container}>
      {projects.slice().sort((a, b) => {
        const endDateA = a.end_date ? new Date(a.end_date) : null;
        const endDateB = b.end_date ? new Date(b.end_date) : null;
        return differenceInMonths(endDateB || new Date(), endDateA || new Date());
      }).map(project => <Project project={project} />)}
    </div>
  );
};

export default Projects;
