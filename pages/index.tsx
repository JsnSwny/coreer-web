import Head from "next/head";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Project } from "@/interfaces/project.model";
import ProjectModal from "@/components/Modal/ProjectModal/ProjectModal";
import DiscoverContainer from "@/components/Container/DiscoverContainer/DiscoverContainer";
import LandingPage from "@/components/LandingPage/LandingPage/LandingPage";

const Home = () => {
	const { user } = useAuth();

	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

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

			{user ? (
				<>
					<ProjectModal
						project={selectedProject!}
						onClose={closeProjectModal}
						isOpen={isProjectModalOpen}
					/>
					<DiscoverContainer openProjectModal={openProjectModal} />
				</>
			) : (
				<LandingPage />
			)}
		</>
	);
};

export default Home;
