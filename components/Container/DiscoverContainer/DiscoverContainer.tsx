import ProfilePreview from "@/components/Profile/ProfilePreview/ProfilePreview";
import styles from "./DiscoverContainer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowCircleLeft,
	faArrowCircleRight,
	faArrowLeft,
	faArrowRight,
	faMessage,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
import Container from "../Container";
import { Profile } from "@/interfaces/profile.model";
import { useState, useEffect } from "react";
import axios from "axios";
import { server } from "@/config";
import { Project } from "@/interfaces/project.model";
import Button from "@/components/Button/Button";
import { useAuth } from "@/contexts/AuthContext";
import { likeUser } from "@/utils/likeUser";
import { chatHrefConstructor } from "@/utils/chatHrefConstructor";
import CapacityList from "@/components/LandingPage/CapacityList/CapacityList";

interface DiscoverContainerProps {
	openProjectModal: (project: Project) => void;
}

const DiscoverContainer = ({ openProjectModal }: DiscoverContainerProps) => {
	const [showLikeAnimation, setShowLikeAnimation] = useState(false);
	const { user, setUser, userToken } = useAuth();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
	const [profiles, setProfiles] = useState<Profile[]>([]);

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		axios.get(`${server}/api/user/`).then((res) => {
			setProfiles(res.data.results);
			setLoading(false);
			setCurrentProfile(res.data.results[currentIndex]);
			console.log(res.data);
		});
	}, []);

	const [isAnimationActive, setIsAnimationActive] = useState(false);
	const [toggleMessageBar, setToggleMessageBar] = useState(false);

	const handlePreviousCard = () => {
		setIsAnimationActive(true);
		setTimeout(() => {
			setCurrentProfile(profiles[currentIndex - 1]);
			setCurrentIndex(currentIndex - 1);
			setIsAnimationActive(false);
		}, 125);
	};

	const handleNextCard = () => {
		setIsAnimationActive(true);
		setTimeout(() => {
			setCurrentProfile(profiles[currentIndex + 1]);
			setCurrentIndex(currentIndex + 1);
			setIsAnimationActive(false);
		}, 125);
	};

	return (
		<div className={styles.container}>
			{/* <FontAwesomeIcon
				icon={faArrowLeft}
				className={`${styles.icon} ${
					currentIndex == 0 ? styles.iconDisabled : ""
				}`}
				onClick={handlePreviousCard}
			/> */}
			<Container>
				<div className={styles.placeholderContainer}>
					<h1 className={styles.title}>Discover Mode</h1>
					<p className={styles.text}>
						Discover mode will unlock once the beta 1.0 capacity has been
						reached. Complete your profile and request for verification to join
						the beta.
					</p>

					<CapacityList />
					<div className={styles.actions}>
						<Button alt text="Manage Profile" link={`/${user!.username}`} />
						{/* <Button
							alt
							text="Request Verification"
							link={`/${user!.username}`}
						/> */}
					</div>
				</div>

				{/* {currentProfile && (
					<ProfilePreview
						openProjectModal={openProjectModal}
						profile={currentProfile}
						showLikeAnimation={showLikeAnimation}
						isAnimationActive={isAnimationActive}
						setShowLikeAnimation={setShowLikeAnimation}
						handleNextCard={handleNextCard}
						handlePreviousCard={handlePreviousCard}
						currentIndex={currentIndex}
					/>
				)} */}
			</Container>

			{/* <FontAwesomeIcon
				icon={faArrowRight}
				className={styles.icon}
				onClick={handleNextCard}
			/> */}
		</div>
	);
};

export default DiscoverContainer;
