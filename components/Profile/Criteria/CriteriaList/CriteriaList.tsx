import { Profile } from "@/interfaces/profile.model";
import CriteriaItem from "../CriteriaItem/CriteriaItem";

import { useAuth } from "@/contexts/AuthContext";
import { Interest } from "@/interfaces/interest.model";
import styles from "./CriteriaList.module.scss";

interface CriteriaListProps {
  profile: Profile;
  openModal: (title: string) => void;
}

const CriteriaList = ({ profile, openModal }: CriteriaListProps) => {
  const { user } = useAuth();
  return (
    <ul className={styles.criteriaList}>
      <CriteriaItem
        title="Interests"
        items={profile.interests.map((item: Interest) => ({
          name: item.name,
          color: item.interest_type == "C" ? "purple" : "orange",
        }))}
        openModal={() => openModal("Interests")}
        canEdit={profile.id == user!.id}
      />
      <CriteriaItem
        title="Languages"
        items={profile.languages.map((item) => ({
          name: item.name,
          color: "blue",
        }))}
        openModal={() => openModal("Skills")}
        canEdit={profile.id == user!.id}
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
