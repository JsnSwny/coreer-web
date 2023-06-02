import styles from "./Projects.module.scss";
import Project from "../Project/Project";
import { Project as ProjectModel } from "@/interfaces/project.model";
import { differenceInMonths } from "date-fns";
import ProjectModal from "@/components/Modal/ProjectModal/ProjectModal";
import { useState } from "react";

interface ProjectsProps {
  projects: ProjectModel[];
  action: (title: string, description: string, item: ProjectModel) => void;
}

const Projects = ({ projects, action }: ProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<ProjectModel | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectModal = (project: ProjectModel) => {
    setIsModalOpen(true);
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <ProjectModal
        project={selectedProject!}
        onClose={closeModal}
        isOpen={isModalOpen}
      />
      <div className={styles.container}>
        {projects
          .slice()
          .sort((a, b) => {
            const endDateA = a.end_date ? new Date(a.end_date) : null;
            const endDateB = b.end_date ? new Date(b.end_date) : null;
            return differenceInMonths(
              endDateB || new Date(),
              endDateA || new Date()
            );
          })
          .map((project) => (
            <Project
              project={project}
              openProjectModal={() => openProjectModal(project)}
              action={action}
            />
          ))}
      </div>
    </>
  );
};

export default Projects;
