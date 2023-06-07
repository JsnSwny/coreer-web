import { Profile } from "@/interfaces/profile.model";
import CriteriaItem from "../CriteriaItem/CriteriaItem";

import styles from "./CriteriaList.module.scss";
import { Interest } from "@/interfaces/interest.model";

interface CriteriaListProps {
  profile: Profile;
}

const CriteriaList = ({ profile }: CriteriaListProps) => {
  console.log(profile);
  return (
    <ul className={styles.criteriaList}>
      <CriteriaItem
        title="Looking for"
        items={profile.looking_for.map((item) => ({
          name: item.name,
          color: "black",
        }))}
      />
      <CriteriaItem
        title="Languages"
        items={profile.languages.map((item) => ({
          name: item.name,
          color: "blue",
        }))}
      />
      <CriteriaItem
        title="Interests"
        items={profile.interests.map((item: Interest) => ({
          name: item.name,
          color: item.interest_type == "C" ? "purple" : "orange",
        }))}
      />
    </ul>
  );
};

export default CriteriaList;
