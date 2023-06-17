import Button from "@/components/Button/Button";
import { Project } from "@/interfaces/project.model";
import { faRobot, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProjectModal.module.scss";
import Carousel from "@/components/Carousel/Carousel";
import TagsList from "@/components/Tags/TagsList/TagsList";

interface ProjectModalProps {
	project: Project;
	isOpen: boolean;
	onClose: () => void;
}

const ProjectModal = ({ project, onClose, isOpen }: ProjectModalProps) => {
	console.log(project)
	if (!isOpen) {
		return null;
	}
	return (
		<div className={styles.modal} onMouseDown={onClose}>
			<div
				className={styles.modalContent}
				onMouseDown={(e) => e.stopPropagation()}
			>
				<Carousel images={project.images} />
				<button className={styles.closeButton} onClick={onClose}>
					<FontAwesomeIcon icon={faXmark} />
				</button>
				<div className={styles.modalHeader}>
				<div className={styles.profile}>
						<img src={project.user.image} className={styles.profileImage} />
						<p>{project.user.first_name} {project.user.last_name}</p>
					</div>
					<div>
						<div className={styles.titleWrapper}>
						<h3 className={styles.title}>{project.title}</h3>
						{project.languages && project.languages.length > 0 && <TagsList
							tags={project.languages.map((item) => ({ text: item.name }))}
						/>}
						</div>
						
						{project.description && <p className={styles.description}>{project.description}</p>}
						
					</div>

					
					<div className={styles.buttons}>
						{project.repo_link && (
							<Button
								text="Repo"
								externalLink
								alt={true}
								link={project.repo_link}
							/>
						)}
						{project.project_link && (
							<Button
								text="View Project"
								externalLink
								link={project.project_link}
							/>
						)}
					</div>
				</div>

			

				<div className={styles.modalBody}>
					<div dangerouslySetInnerHTML={{ __html: project.content }}></div>
				</div>
			</div>
		</div>
	);
};

export default ProjectModal;
