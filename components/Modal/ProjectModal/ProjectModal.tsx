import Button from "@/components/Button/Button";
import { Project } from "@/interfaces/project.model";
import { faRobot, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProjectModal.module.scss";
import Carousel from "@/components/Carousel/Carousel";

interface ProjectModalProps {
	project: Project;
	isOpen: boolean;
	onClose: () => void;
}

const ProjectModal = ({ project, onClose, isOpen }: ProjectModalProps) => {
	console.log(project);
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
					<div>
						<h3 className={styles.title}>{project.title}</h3>
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
