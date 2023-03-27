import styles from "./Projects.module.scss";
import Project from "../Project/Project";

const Projects = () => {
  const project = {
    id: 1,
    title: "coreer",
    start_date: new Date(),
    end_date: new Date(),
    description:
      "Lorem ipsum dolor sit amet consectetur. Tempor dui vulputate netus facilisis vel.",
  };

  return (
    <div className={styles.container}>
      <Project project={project} />
      <Project project={project} />
      <Project project={project} />
    </div>
  );
};

export default Projects;
