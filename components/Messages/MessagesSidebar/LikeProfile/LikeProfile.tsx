import { Profile } from "@/interfaces/profile.model";
import styles from "./LikeProfile.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

interface LikeProfileProps {
	profile: Profile;
}

const LikeProfile = ({ profile }: LikeProfileProps) => {
	const router = useRouter();
	return (
		<li
			className={`${styles.conversation} ${
				router.query?.username == profile.username ? styles.active : ""
			}`}
		>
			<Link href={`/${profile.username}`} className={styles.link}>
				<img className={styles.image} src={profile.image} />
				<div className={styles.content}>
					<h4 className={styles.name}>
						{profile.first_name} {profile.last_name}
					</h4>
				</div>
			</Link>
		</li>
	);
};

export default LikeProfile;
