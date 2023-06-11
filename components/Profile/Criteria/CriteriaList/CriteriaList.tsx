import { Profile } from "@/interfaces/profile.model";
import CriteriaItem from "../CriteriaItem/CriteriaItem";

import styles from "./CriteriaList.module.scss";
import { Interest } from "@/interfaces/interest.model";

interface CriteriaListProps {
  profile: Profile;
  openModal: (title: string) => void;
}

const CriteriaList = ({ profile, openModal }: CriteriaListProps) => {
  return (
    <ul className={styles.criteriaList}>
      <CriteriaItem
        title="Interests"
        items={profile.interests.map((item: Interest) => ({
          name: item.name,
          color: item.interest_type == "C" ? "purple" : "orange",
        }))}
        openModal={() => openModal("Interests")}
      />
      <CriteriaItem
        title="Languages"
        items={profile.languages.map((item) => ({
          name: item.name,
          color: "blue",
        }))}
        openModal={() => openModal("Skills")}
      />
      <CriteriaItem
        title="Looking for"
        items={profile.looking_for.map((item) => ({
          name: item.name,
          color: "black",
        }))}
      />
    </ul>
  );
};

export default CriteriaList;
