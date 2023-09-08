import Button from "@/components/Button/Button/Button";
import ProjectModal from "@/components/Modal/ProjectModal/ProjectModal";
import { useAuth } from "@/contexts/AuthContext";
import { Profile } from "@/interfaces/profile.model";
import { Project as ProjectModel } from "@/interfaces/project.model";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { differenceInMonths } from "date-fns";
import { useState } from "react";
import Project from "../Project/Project";
import styles from "./Projects.module.scss";
import ProjectPlaceholder from "../Project/ProjectPlaceholder";

interface ProjectsProps {
	projects: ProjectModel[];
	action: (title: string, description?: string, item?: ProjectModel) => void;
	isProfile?: boolean;
	showEdit: boolean;
	margin?: boolean;
	large?: boolean;
	openProjectModal: (project: ProjectModel) => void;
	sortByEndDate?: boolean;
	loading?: boolean;
}

const Projects = ({
	projects,
	action,
	isProfile = false,
	showEdit,
	margin = false,
	large = false,
	openProjectModal,
	sortByEndDate,
	loading = false,
}: ProjectsProps) => {
	if (loading) {
		return (
			<div className={`${styles.container}`}>
				<ProjectPlaceholder />
				<ProjectPlaceholder />
				<ProjectPlaceholder />
				<ProjectPlaceholder />
				<ProjectPlaceholder />
				<ProjectPlaceholder />
				<ProjectPlaceholder />
				<ProjectPlaceholder />
				<ProjectPlaceholder />
				<ProjectPlaceholder />
				<ProjectPlaceholder />
				<ProjectPlaceholder />
			</div>
		);
	}
	return (
		<>
			<div
				className={`${styles.container} ${large ? styles.large : ""} ${
					margin ? styles.margin : ""
				}`}
			>
				{projects
					.slice()
					.sort((a, b) => {
						if (sortByEndDate) {
							const endDateA = a.end_date ? new Date(a.end_date) : null;
							const endDateB = b.end_date ? new Date(b.end_date) : null;
							const startDateA = a.start_date ? new Date(a.start_date) : null;
							const startDateB = b.start_date ? new Date(b.start_date) : null;

							if (!startDateA && !startDateB) {
								// If both projects have no start date, sort by end date
								return differenceInMonths(
									endDateB || new Date(),
									endDateA || new Date()
								);
							} else if (!startDateA) {
								// If only project A has no start date, move it to the end
								return 1;
							} else if (!startDateB) {
								// If only project B has no start date, move it to the end
								return -1;
							} else {
								// Sort by end date for projects with both start and end dates
								return differenceInMonths(
									endDateB || new Date(),
									endDateA || new Date()
								);
							}
						} else {
							return 1;
						}
					})
					.map((project) => (
						<Project
							key={project.id}
							project={project}
							openProjectModal={() => openProjectModal(project)}
							action={action}
							showEdit={showEdit}
							isProfile={isProfile}
							large={large}
						/>
					))}
			</div>
		</>
	);
};

export default Projects;
