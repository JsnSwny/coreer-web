import React, { useEffect } from "react";
import Project from "../Profile/Projects/Project/Project";
import { Project as ProjectModel } from "@/interfaces/project.model";
import {
	FetchNextPageOptions,
	InfiniteData,
	InfiniteQueryObserverResult,
	QueryFunction,
} from "react-query";
import { useInView } from "react-intersection-observer";
import styles from "./ProjectsContainer.module.scss";
import { ImSpinner2 } from "react-icons/im";

interface APIResultsI {
	results: ProjectModel[];
	next: string;
}

interface ProjectsContainerProps {
	data: InfiniteData<APIResultsI> | undefined;
	openProjectModal: (project: ProjectModel) => void;
	fetchNextPage: (
		options?: FetchNextPageOptions | undefined
	) => Promise<InfiniteQueryObserverResult<APIResultsI, unknown>>;
	hasNextPage: boolean | undefined;
	isFetchingNextPage: boolean;
}

const ProjectsContainer = ({
	data,
	openProjectModal,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
}: ProjectsContainerProps) => {
	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage]);

	return (
		<>
			<ul className={styles.container}>
				{data &&
					data.pages.map((page) =>
						page.results.map((project, i) => {
							if (page.results.length === i + 1) {
								return (
									<Project
										ref={ref}
										key={project.id}
										project={project}
										openProjectModal={() => openProjectModal(project)}
										showEdit={false}
										isProfile={false}
										large={false}
									/>
								);
							}
							return (
								<Project
									key={project.id}
									project={project}
									openProjectModal={() => openProjectModal(project)}
									showEdit={false}
									isProfile={false}
									large={false}
								/>
							);
						})
					)}
			</ul>
			{isFetchingNextPage && <ImSpinner2 className={styles.spinner} />}
		</>
	);
};

export default ProjectsContainer;
