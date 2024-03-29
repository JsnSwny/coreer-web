import React from "react";
import styles from "./ProfileCard.module.scss";
import { Profile } from "@/interfaces/profile.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import TagsList from "@/components/Tags/TagsList/TagsList";
import Link from "next/link";
import LikeButton from "@/components/Button/LikeButton/LikeButton";
import { useAuth } from "@/contexts/AuthContext";

type EndDate = Date | "Present";

interface CardProps {
	profile: Profile;
}

const ProfileCard = ({ profile }: CardProps) => {
	const { user } = useAuth();
	const getLocation = () => {
		if (profile.location) {
			let location = profile.location.split(", ");
			return location[0];
		}
	};
	return (
		<Link href={`/${profile.username}`} className={styles.card}>
			<img className={styles.image} src={profile.image} />
			{user && <LikeButton profile={profile} className={styles.likeButton} />}
			<div className={styles.content}>
				<h3 className={styles.title}>
					{profile.first_name} {profile.last_name}
				</h3>
				<p className={styles.subtitle}>{profile.job}</p>
				<p className={styles.location}>
					<FontAwesomeIcon icon={faLocationPin} className={styles.pin} />{" "}
					{getLocation()} <span className={styles.locationSeparator}>•</span>{" "}
					<span className={styles.miles}>3000 miles away</span>
				</p>
			</div>

			{profile.languages.length > 0 && (
				<>
					<hr className={styles.divider} />
					<TagsList
						tags={profile.languages.map((item) => ({ text: item.name }))}
						className={styles.tags}
						fade
					/>
				</>
			)}
		</Link>
	);
};

export default ProfileCard;
