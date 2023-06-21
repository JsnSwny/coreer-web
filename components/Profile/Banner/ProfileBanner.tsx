import Button from "@/components/Button/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Profile } from "@/interfaces/profile.model";
import { chatHrefConstructor } from "@/utils/chatHrefConstructor";
import { likeUser } from "@/utils/likeUser";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import {
	faCameraRetro,
	faEnvelope,
	faPencil,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./ProfileBanner.module.scss";
import globalStyles from "@/styles/globalStyles.module.scss";
import Project from "../Projects/Project/Project";
import { Project as ProjectModel } from "@/interfaces/project.model";

interface ProfileBannerProps {
	profile: Profile;
	openModal: (section: string, description?: string, item?: object) => void;
	openProjectModal: (project: ProjectModel) => void;
}

const ProfileBanner = ({
	profile,
	openModal,
	openProjectModal,
}: ProfileBannerProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
		profile.profile_photo ? profile.profile_photo : profile.image
	);
	const { user, updateProfilePicture, userToken } = useAuth();

	useEffect(() => {
		setImagePreviewUrl(
			profile.profile_photo ? profile.profile_photo : profile.image
		);
	}, [profile]);

	const pinnedProject = profile.projects.find((item) => item.is_pinned);

	const photoUpload = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const reader = new FileReader();
		const file = e.target.files?.[0] as File | undefined;
		if (file) {
			reader.onloadend = () => {
				updateProfilePicture(user!.id, userToken!, file);
				setImagePreviewUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.content}>
					{imagePreviewUrl && (
						<img className={styles.profilePhoto} src={imagePreviewUrl} />
					)}
					{user && profile.id == user.id && (
						<label htmlFor="photo-upload" className={styles.changePhoto}>
							<FontAwesomeIcon
								icon={faCameraRetro}
								className={styles.changePhotoImage}
							/>

							<input
								id="photo-upload"
								className={styles.fileInput}
								type="file"
								onChange={photoUpload}
							/>
						</label>
					)}
				</div>
				<div className={styles.titleWrapper}>
					<h1 className={styles.title}>
						{profile.first_name} {profile.last_name}
					</h1>
					{user && profile.id == user.id && (
						<FontAwesomeIcon
							icon={faPencil}
							className={styles.titleIcon}
							onClick={() => openModal("Details")}
						/>
					)}
				</div>

				<p className={styles.subtitle}>
					{profile.current_level?.name} {/*• BSc Computer Science*/}
				</p>
				<p className={styles.location}>{profile.location}</p>
				<p className={styles.bio}>{profile.bio}</p>
				{/* <ResponseBanner /> */}
				{user && profile.id != user.id && (
					<div className={styles.buttons}>
						<Button
							text="Message"
							link={`/messages/${chatHrefConstructor(user, profile)}`}
							size="small"
							alt={true}
							icon={faEnvelope}
						/>
						<Button
							text={user!.following.includes(profile!.id) ? "Remove" : "Like"}
							alt={!user!.following.includes(profile!.id)}
							onClick={() => {
								likeUser(user!, profile, userToken!);
							}}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
							size="small"
							icon={
								isHovered || user!.following.includes(profile.id)
									? faStar
									: farStar
							}
						/>
					</div>
				)}
			</div>
			{pinnedProject && pinnedProject.image && profile!.projects.length > 0 && (
				<div className={styles.featuredWrapper}>
					<div
						className={`${styles.imageWrapper}`}
						onClick={() => openProjectModal(pinnedProject)}
					>
						<div className={`${globalStyles.aspect_ratio_16x9}`}>
							<img src={pinnedProject.image} />
						</div>
						<div className={styles.featuredText}>
							<h4>Featured Project</h4>
							<p>{pinnedProject.title}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileBanner;
