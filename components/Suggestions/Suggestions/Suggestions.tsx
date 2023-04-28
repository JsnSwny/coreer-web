import styles from "./Suggestions.module.scss";
import Suggestion from "../Suggestion/Suggestion";
import { Profile } from "@/interfaces/profile.model";

interface SuggestionsProps {
  user: Profile;
  suggestions: Profile[];
}

const Suggestions = ({ user, suggestions = [] }: SuggestionsProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Similar to {user.first_name}</h3>
      <ul className={styles.list}>
        {suggestions.slice(0, 3).map((item) => (
          <Suggestion profile={item} />
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
