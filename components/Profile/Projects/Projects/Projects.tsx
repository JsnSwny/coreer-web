import Button from "@/components/Button/Button";
import ProjectModal from "@/components/Modal/ProjectModal/ProjectModal";
import { useAuth } from "@/contexts/AuthContext";
import { Profile } from "@/interfaces/profile.model";
import { Project as ProjectModel } from "@/interfaces/project.model";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { differenceInMonths } from "date-fns";
import { useState } from "react";
import Project from "../Project/Project";
import styles from "./Projects.module.scss";

interface ProjectsProps {
	projects: ProjectModel[];
	action: (title: string, description?: string, item?: ProjectModel) => void;
	profile: Profile;
}

const Projects = ({ projects, action, profile }: ProjectsProps) => {
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

	const { githubToken, user } = useAuth();
	// const getRepositories = async () => {
	//   const response = await axios.get("https://api.github.com/user/repos", {
	//     headers: {
	//       Authorization: `Bearer ${githubToken}`,
	//     },
	//   });
	//   const repositories = response.data;
	//   console.log(repositories);
	// };

	// useEffect(() => {
	//   getRepositories();
	// }, [githubToken]);
	const showEdit = profile.id == user?.id;

	return (
		<>
			<ProjectModal
				project={selectedProject!}
				onClose={closeModal}
				isOpen={isModalOpen}
			/>

			{showEdit && (
				<Button
					text="Add New Project"
					alt
					icon={faPlus}
					onClick={() => action("Project")}
				/>
			)}

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
							key={project.id}
							project={project}
							openProjectModal={() => openProjectModal(project)}
							action={action}
							showEdit={showEdit}
						/>
					))}
			</div>
		</>
	);
};

export default Projects;
