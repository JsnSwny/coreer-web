import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import DetailsModalForm from "@/components/Modal/Forms/DetailsModalForm/DetailsModalForm";
import EducationModalForm from "@/components/Modal/Forms/EducationModalForm/EducationModalForm";
import InterestsModalForm from "@/components/Modal/Forms/InterestsModalForm/InterestsModalForm";
import ProjectModalForm from "@/components/Modal/Forms/ProjectModalForm/ProjectModalForm";
import SkillsModalForm from "@/components/Modal/Forms/SkillsModalForm/SkillsModalForm";
import WorkModalForm from "@/components/Modal/Forms/WorkModalForm/WorkModalForm";
import Modal from "@/components/Modal/Modal/Modal";
import AboutSection from "@/components/Profile/About/AboutSection/AboutSection";
import ProfileBanner from "@/components/Profile/Banner/ProfileBanner";
import CriteriaList from "@/components/Profile/Criteria/CriteriaList/CriteriaList";
import Nav from "@/components/Profile/Nav/Nav";
import Projects from "@/components/Profile/Projects/Projects/Projects";
import { server } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { Profile } from "@/interfaces/profile.model";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import { useState } from "react";

interface ProfileProps {
	profile: Profile | null;
}

interface ActiveSectionProps {
	title: string;
	description?: string;
}

const Profile = ({ profile }: ProfileProps) => {
	const { user } = useAuth();

	if (user) {
		profile = user!.id == profile?.id ? user : profile;
	}

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalItem, setModalItem] = useState(null);
	const [activeSection, setActiveSection] = useState<ActiveSectionProps | null>(
		null
	);
	const [recommendations, setRecommendations] = useState([]);

	const [section, setSection] = useState("Projects");

	const openModal = (section: string, description: string = "", item?: any) => {
		setActiveSection({ title: section, description });
		if (item) setModalItem(item);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setModalItem(null);
		setIsModalOpen(false);
	};

	// useEffect(() => {
	//   if (profile) {
	//     axios
	//       .get(`${server}/recommend/6/${profile.id}`)
	//       .then((res) => setRecommendations(res.data.recommendations));
	//   }
	// }, []);

	if (!profile) {
		return <h1>Profile not found</h1>;
	} else {
		return (
			<>
				<Head>
					<title>{`${profile.first_name} ${profile.last_name} | coreer`}</title>
				</Head>
				<Container margin>
					{activeSection && (
						<Modal
							title={activeSection.title}
							description={activeSection.description}
							isOpen={isModalOpen}
							onClose={closeModal}
						>
							{activeSection.title === "Details" && (
								<DetailsModalForm closeModal={closeModal} />
							)}
							{activeSection.title === "Project" && (
								<ProjectModalForm closeModal={closeModal} item={modalItem} />
							)}
							{activeSection.title === "Education" && (
								<EducationModalForm closeModal={closeModal} item={modalItem} />
							)}
							{activeSection.title === "Experience" && (
								<WorkModalForm closeModal={closeModal} item={modalItem} />
							)}
							{activeSection.title === "Skills" && (
								<SkillsModalForm closeModal={closeModal} />
							)}
							{activeSection.title === "Interests" && (
								<InterestsModalForm closeModal={closeModal} />
							)}
						</Modal>
					)}

					<ProfileBanner profile={profile} openModal={openModal} />
					<CriteriaList profile={profile} openModal={openModal} />
					<Nav section={section} setSection={setSection} />

					{section == "Projects" && (
						<>
							{profile.id == user!.id && (
								<Button
									text="Add New Project"
									alt
									icon={faPlus}
									onClick={() => openModal("Project")}
								/>
							)}
							<Projects
								projects={profile.projects}
								action={openModal}
								isProfile
								showEdit={profile.id == user!.id}
								margin
							/>
						</>
					)}
					{/* {section == "Similar Users" && (
            <ProfileCardList>
              {recommendations.slice(1, 5).map((item: Profile) => (
                <ProfileCard profile={item} key={item.id} />
              ))}
            </ProfileCardList>
          )} */}

					{section == "About" && (
						<AboutSection profile={profile} openModal={openModal} />
					)}
				</Container>
			</>
		);
	}
};

export const getServerSideProps = async (context: any) => {
	const res = await fetch(
		`${server}/api/profiles/${context?.params?.username}/`
	);
	const profile = await res.json();

	return {
		props: {
			profile,
		},
	};
};

export default Profile;
