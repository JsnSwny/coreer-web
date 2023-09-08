import styles from "./Project.module.scss";
import { Project } from "@/interfaces/project.model";
import { format, parseISO } from "date-fns";
import TagsList from "@/components/Tags/TagsList/TagsList";
import React, { useRef, ForwardedRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPencil, faRobot } from "@fortawesome/free-solid-svg-icons";
import { calculateTimeDifference } from "@/utils/calculateTimeDifference";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

interface ProjectProps {
	project: Project;
	openProjectModal: () => void;
	action?: (title: string, description: string, item: Project) => void;
	showEdit: boolean;
	isProfile?: boolean;
	large?: boolean;
}

const Project = React.forwardRef(
	(
		{
			project,
			openProjectModal,
			action,
			showEdit,
			isProfile,
			large,
		}: ProjectProps,
		ref: ForwardedRef<HTMLHeadingElement> | null
	) => {
		const videoRef = useRef<HTMLVideoElement | null>(null);

		const { user } = useAuth();

		const handleMouseEnter = () => {
			if (videoRef.current) {
				videoRef.current.play();
			}
		};

		const handleMouseLeave = () => {
			if (videoRef.current) {
				videoRef.current.pause();
				videoRef.current.currentTime = 0;
			}
		};
		return (
			<div
				className={`${styles.container} ${large ? styles.large : ""}`}
				onClick={(e) => openProjectModal()}
			>
				<div
					className={`${styles.placeholder} ${
						!project.image ? styles.placeholderActive : ""
					} ${showEdit ? styles.showEdit : ""}`}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					{project.video && (
						<video
							className={styles.video}
							ref={videoRef}
							loop
							muted
							src={project.video}
						></video>
					)}
					{project.image && (
						<img
							alt="Project thumbnail"
							className={styles.image}
							src={project.image}
						/>
					)}
					{!project.image && (
						<FontAwesomeIcon
							icon={faRobot}
							className={styles.placeholderIcon}
						/>
					)}
					{showEdit && action && (
						<div
							className={styles.editWrapper}
							onClick={(e) => {
								e.stopPropagation();
								action("Project", "", project);
							}}
						>
							<FontAwesomeIcon icon={faPencil} className={styles.editIcon} />
						</div>
					)}
				</div>
				<div className={styles.contentContainer}>
					{isProfile && project.start_date && (
						<p className={styles.date}>
							{`${format(parseISO(project.start_date), "MMM yyyy")} - ${
								project.end_date
									? format(parseISO(project.end_date), "MMM yyyy")
									: "Present"
							}`}{" "}
							({calculateTimeDifference(project.start_date, project.end_date)})
						</p>
					)}
					{ref ? (
						<h4 ref={ref} className={styles.title}>
							{project.title}
						</h4>
					) : (
						<h4 className={styles.title}>{project.title}</h4>
					)}

					<div className={styles.topContainer}>
						{!isProfile && (
							<Link
								href={`/${project.user.username}`}
								className={styles.profile}
								onClick={(e) => e.stopPropagation()}
							>
								<img
									alt="Project creator profile picture"
									src={project.user.image}
									className={styles.profileImage}
								/>
								<p>
									{project.user.first_name} {project.user.last_name}
								</p>
							</Link>
						)}
						{project.languages && project.languages.length > 0 && (
							<TagsList
								tags={project.languages.map((item) => ({
									text: item.name,
									highlight: user
										? user?.languages.some((lang) => item.id == lang.id)
										: true,
								}))}
								fade
								small
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
);

Project.displayName = "Project";

export default Project;
