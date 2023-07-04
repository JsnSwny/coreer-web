import TagsList from "@/components/Tags/TagsList/TagsList";
import styles from "./ProfilePreview.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import {
	faCheck,
	faMessage,
	faPaperPlane,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Profile } from "@/interfaces/profile.model";
import ProfilePreviewSidebar from "./ProfilePreviewSidebar/ProfilePreviewSidebar";
import Projects from "../Projects/Projects/Projects";
import { Project } from "@/interfaces/project.model";
import { likeUser } from "@/utils/likeUser";
import { chatHrefConstructor } from "@/utils/chatHrefConstructor";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HiPaperAirplane } from "react-icons/hi";

interface ProfilePreviewProps {
	profile: Profile;
	openProjectModal: (project: Project) => void;
	showLikeAnimation: boolean;
	isAnimationActive: boolean;
	setShowLikeAnimation: (value: boolean) => void;
	handleNextCard: () => void;
}

const ProfilePreview = ({
	profile,
	openProjectModal,
	showLikeAnimation,
	isAnimationActive,
	setShowLikeAnimation,
	handleNextCard,
}: ProfilePreviewProps) => {
	const { user, userToken, setUser } = useAuth();

	const [toggleMessageBar, setToggleMessageBar] = useState(false);
	const [message, setMessage] = useState("");

	return (
		<div
			key={profile.id}
			className={`${styles.container} ${
				isAnimationActive ? styles.scaleDown : styles.scaleUp
			}`}
		>
			{showLikeAnimation && (
				<div className={styles.likeAnimation}>
					<FontAwesomeIcon
						className={styles.likeAnimationIcon}
						icon={faCheck}
					/>
				</div>
			)}
			<div
				className={`${styles.content} ${
					toggleMessageBar ? styles.contentOverlay : ""
				}`}
				onClick={() => setToggleMessageBar(false)}
			>
				<ProfilePreviewSidebar profile={profile} />
				<div className={styles.main}>
					<section className={styles.section}>
						<h3 className={styles.section__heading}>Projects</h3>
						<Projects
							projects={profile.projects}
							action={() => {}}
							isProfile
							showEdit={user ? profile.id == user!.id : false}
							openProjectModal={openProjectModal}
							sortByEndDate
						/>
					</section>
					<section className={styles.section}>
						<h3 className={styles.section__heading}>Work Experience</h3>
					</section>
				</div>
			</div>
			<div
				className={`${styles.messageBar} ${
					toggleMessageBar ? styles.messageBarActive : ""
				}`}
			>
				<textarea
					className={`${styles.messageBarTextarea}`}
					onClick={() => message.length > 0 && setToggleMessageBar(true)}
					onChange={(e) => {
						e.target.value.length == 0
							? setToggleMessageBar(false)
							: setToggleMessageBar(true);

						setMessage(e.target.value);
					}}
					placeholder={`Start a conversation with ${profile.first_name}...`}
				></textarea>
				<div className={styles.messageBarLikeWrapper}>
					<FontAwesomeIcon
						onClick={() => {
							const followList = likeUser(user!, profile, userToken!);
							setUser({ ...user!, following: followList });
							setShowLikeAnimation(true);
							setTimeout(() => {
								setShowLikeAnimation(false);
								handleNextCard();
							}, 900);
						}}
						className={styles.messageBarLike}
						icon={message.length > 0 ? faPaperPlane : faStar}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfilePreview;
