import styles from "@/styles/Suggestions.module.scss";
import Suggestion from "./Suggestion";
import { Profile } from "@/interfaces/profile.model";

interface SuggestionsProps {
	user: Profile
}

const Suggestions = ({user}: SuggestionsProps) => {
	return <div className={styles.container}>
		<h3 className={styles.title}>Similar to {user.first_name}</h3>
		<Suggestion />
		<Suggestion />
		<Suggestion />
	</div>
}

export default Suggestions