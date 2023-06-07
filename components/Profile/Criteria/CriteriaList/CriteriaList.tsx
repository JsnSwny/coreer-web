import { Profile } from "@/interfaces/profile.model";
import CriteriaItem from "../CriteriaItem/CriteriaItem";

import styles from "./CriteriaList.module.scss";

interface CriteriaListProps {
  profile: Profile;
}

const CriteriaList = ({ profile }: CriteriaListProps) => {
  return (
    <ul className={styles.criteriaList}>
      <CriteriaItem title="Looking for" items={profile.languages} />
      <CriteriaItem title="Languages" items={profile.languages} />
      <CriteriaItem title="Interests" items={profile.languages} />
    </ul>
  );
};

export default CriteriaList;
