import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Container from "@/components/Container/Container";
import ProfileCardList from "@/components/Card/ProfileCardList/ProfileCardList";
import ProfileCard from "@/components/Card/ProfileCard/ProfileCard";
import { server } from "@/config";
import { useRouter } from "next/router";
import { Profile } from "@/interfaces/profile.model";
import Section from "@/components/Layout/Section/Section";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import withAuth from "@/components/Route/withAuth";
import axios from "axios";
import SectionList from "@/components/Layout/SectionList/SectionList";
import ExploreHeading from "@/components/Layout/ExploreHeading/ExploreHeading";
import TopMatchBanner from "@/components/Banner/TopMatchBanner/TopMatchBanner";
import TopMatchBannerPlaceholder from "@/components/Banner/TopMatchBanner/TopMatchBannerPlaceholder";
import ProfileCardPlaceholder from "@/components/Card/ProfileCard/ProfileCardPlaceholder";
import { Project } from "@/interfaces/project.model";
import Projects from "@/components/Profile/Projects/Projects/Projects";
import ProjectModal from "@/components/Modal/ProjectModal/ProjectModal";
import ExploreBanner from "@/components/Layout/Explore/ExploreBanner/ExploreBanner";

const Home = () => {
	const { user, userToken } = useAuth();

	const [projects, setProjects] = useState<Project[]>([]);

	const [loading, setLoading] = useState(true);

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

	useEffect(() => {
		// router.push(`/${user!.username}`);
		console.log(loading);
		axios.get(`${server}/api/projects/`).then((res) => {
			console.log(res.data);
			setProjects(res.data);
			setLoading(false);
			console.log("Not loading");
		});
	}, []);

	return (
		<>
			<Head>
				<title>Coreer | Discover Projects from Talented Students</title>
				<meta
					name="description"
					content="Unlock the power of connection and collaboration at Coreer. Join our tech community to connect, collaborate, and curate. Start shaping your career today!"
				/>
			</Head>
			{/* <ExploreBanner /> */}
			<Container margin size="large">
				<ProjectModal
					project={selectedProject!}
					onClose={closeProjectModal}
					isOpen={isProjectModalOpen}
				/>
				{/* <ExploreHeading /> */}

				<Projects
					projects={projects}
					action={() => console.log("open")}
					showEdit={false}
					large
					openProjectModal={openProjectModal}
					loading={loading}
				/>
			</Container>
		</>
	);
};

export default Home;
