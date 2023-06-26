import Button from "@/components/Button/Button";
import Projects from "../Projects/Projects";
import { Profile } from "@/interfaces/profile.model";
import { useAuth } from "@/contexts/AuthContext";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Project } from "@/interfaces/project.model";
import styles from "./ProjectSection.module.scss";

interface ProjectSectionProps {
	openModal: (title: string) => void;
	openProjectModal: (project: Project) => void;
	profile: Profile;
}

const ProjectSection = ({
	openModal,
	openProjectModal,
	profile,
}: ProjectSectionProps) => {
	const { user } = useAuth();
	return (
		<section className={styles.section}>
			{user && profile.id == user!.id && (
				<div className={styles.actions}>
					<Button
						text="Add New Project"
						alt
						icon={faPlus}
						onClick={() => openModal("Project")}
					/>
				</div>
			)}
			<Projects
				projects={profile.projects}
				action={openModal}
				isProfile
				showEdit={user ? profile.id == user!.id : false}
				openProjectModal={openProjectModal}
				sortByEndDate
			/>
		</section>
	);
};

export default ProjectSection;
