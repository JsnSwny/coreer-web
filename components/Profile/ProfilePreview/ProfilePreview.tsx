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
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HiPaperAirplane } from "react-icons/hi";
import { server } from "@/config";
import axios from "axios";
import { ConversationContext } from "@/contexts/ConversationContext";
import { useContext } from "react";
import { ImSpinner2 } from "react-icons/im";

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
	const [actionLoading, setActionLoading] = useState(false);

	const { setConversations, conversations } = useContext(ConversationContext);

	useEffect(() => {
		setToggleMessageBar(false);
	}, [profile]);

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
					value={message}
					onChange={(e) => {
						e.target.value.length == 0
							? setToggleMessageBar(false)
							: setToggleMessageBar(true);

						setMessage(e.target.value);
					}}
					placeholder={`Start a conversation with ${profile.first_name}...`}
				></textarea>
				<div
					className={styles.messageBarLikeWrapper}
					onClick={() => {
						setActionLoading(true);
						if (message.length > 0) {
							axios
								.post(
									`${server}/api/conversations/`,
									{
										name: chatHrefConstructor(user!, profile),
									},
									{
										headers: {
											Authorization: `Token ${userToken}`,
										},
									}
								)
								.then((res) =>
									axios
										.post(`${server}/api/messages/`, {
											from_user_id: user!.id,
											to_user_id: profile.id,
											content: message,
											conversation_id: res.data.id,
										})
										.then((messageRes) => {
											setShowLikeAnimation(true);
											setToggleMessageBar(false);
											setMessage("");
											const newConvo = {
												...res.data,
												last_message: messageRes.data,
											};

											setConversations([newConvo, ...conversations]);
											setTimeout(() => {
												setShowLikeAnimation(false);
												handleNextCard();
											}, 900);
											setActionLoading(false);
										})
								);
						} else {
							const followList = likeUser(user!, profile, userToken!);
							setUser({ ...user!, following: followList });
							setShowLikeAnimation(true);
							setTimeout(() => {
								setShowLikeAnimation(false);
								handleNextCard();
							}, 900);
						}
					}}
				>
					{actionLoading ? (
						<ImSpinner2 className={styles.spinner} />
					) : (
						<FontAwesomeIcon
							className={styles.messageBarLike}
							icon={message.length > 0 ? faPaperPlane : faStar}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProfilePreview;
