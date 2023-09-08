import Head from "next/head";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Project as ProjectModel } from "@/interfaces/project.model";
import ProjectModal from "@/components/Modal/ProjectModal/ProjectModal";
import axios from "axios";
import { server } from "@/config";
import Projects from "@/components/Profile/Projects/Projects/Projects";
import Container from "@/components/Container/Container/Container";
import { QueryFunction, useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import Project from "@/components/Profile/Projects/Project/Project";
import ProjectsContainer from "@/components/Projects/ProjectsContainer";

const Home = () => {
	const { user } = useAuth();

	const [selectedProject, setSelectedProject] = useState<ProjectModel | null>(
		null
	);
	const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

	interface APIResultsI {
		results: ProjectModel[];
		next: string;
	}

	const fetchProjects: QueryFunction<APIResultsI, "projects"> = async (
		pageParam
	) => {
		const data = await axios.get(
			`${server}/api/projects?page=${pageParam}&limit=${LIMIT}`
		);
		return {
			results: data.data.results,
			next: data.data.next,
		};
	};

	const LIMIT = 5;

	const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery(
			"projects",
			({ pageParam = 1 }) => fetchProjects(pageParam),
			{
				getNextPageParam: (lastPage, allPages) => {
					const nextPage = lastPage.next ? allPages.length + 1 : undefined;
					return nextPage;
				},
			}
		);

	const openProjectModal = (project: Project) => {
		setIsProjectModalOpen(true);
		setSelectedProject(project);
	};

	const closeProjectModal = () => {
		setSelectedProject(null);
		setIsProjectModalOpen(false);
	};

	return (
		<>
			<Head>
				<title>
					{!user
						? "Coreer | Personalised Professional Networking"
						: "Discover | Coreer"}
				</title>
				<meta
					name="description"
					content="Unlock the power of connection and collaboration at Coreer. Join our tech community to connect, collaborate, and curate. Start shaping your career today!"
				/>
			</Head>
			<ProjectModal
				project={selectedProject!}
				onClose={closeProjectModal}
				isOpen={isProjectModalOpen}
			/>
			<Container margin>
				<ProjectsContainer
					data={data}
					openProjectModal={openProjectModal}
					fetchNextPage={fetchNextPage}
					hasNextPage={hasNextPage}
					isFetchingNextPage={isFetchingNextPage}
				/>
			</Container>
		</>
	);
};

export default Home;
