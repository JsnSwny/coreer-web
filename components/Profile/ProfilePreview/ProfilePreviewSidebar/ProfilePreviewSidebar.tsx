import TagsList from "@/components/Tags/TagsList/TagsList";
import styles from "./ProfilePreviewSidebar.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import { Profile } from "@/interfaces/profile.model";
import Button from "@/components/Button/Button/Button";
import { faMessage, faStar } from "@fortawesome/free-solid-svg-icons";

interface ProfilePreviewSidebar {
	profile: Profile;
}

const ProfilePreviewSidebar = ({ profile }: ProfilePreviewSidebar) => {
	const { user } = useAuth();
	return (
		<aside className={styles.sidebar}>
			<header className={styles.header}>
				<div className={styles.profile}>
					<img src={profile?.image} />
					<div>
						<h2>
							{profile?.first_name} {profile?.last_name}
						</h2>
						<p className={styles.level}>{profile?.current_level?.name}</p>
						<p className={styles.location}>{profile?.location}</p>
					</div>
				</div>
				{/* <div className={styles.actions}>
          <Button text="Save" alt icon={faStar} />
          <Button text="Message" icon={faMessage} />
        </div> */}
			</header>

			<section className={styles.section}>
				<h3>Skills</h3>
				<TagsList
					tags={profile!.languages.map((item) => ({
						text: item.name,
						highlight: user
							? user?.languages.some((lang) => item.id == lang.id)
							: true,
					}))}
				/>
			</section>
			<section className={styles.section}>
				<h3 className={styles.section__heading}>Interests</h3>
				<TagsList
					tags={profile!.interests.map((item) => ({
						text: item.name,
						color: item.interest_type == "C" ? "purple" : "orange",
						highlight: user
							? user?.interests.some((interest) => item.id == interest.id)
							: true,
					}))}
				/>
			</section>
		</aside>
	);
};

export default ProfilePreviewSidebar;
