import { useAuth } from "@/contexts/AuthContext";
import { Interest } from "@/interfaces/interest.model";
import globalStyles from "@/styles/globalStyles.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Actions from "../Actions/Actions";
import TagSelector from "../TagSelector/TagSelector/TagSelector";
import TagSelectorList from "../TagSelector/TagSelectorList/TagSelectorList";

interface InterestsProps {
  options: Interest[];
  defaultOptions: Interest[];
}

const Interests = ({ options, defaultOptions }: InterestsProps) => {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateUser({
      interests_id: selectedOptions.map((item) => item.id),
    });
    router.push("/onboarding/languages");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={globalStyles.formGroup}>
        <label className={globalStyles.label}>Career Interests</label>
        <TagSelectorList>
          {options
            .filter((item) => item.interest_type == "C")
            .map((option) => (
              <TagSelector
                key={option.id}
                title={option.name}
                active={selectedOptions.some((item) => item.id == option.id)}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                option={option}
                disabled={selectedOptions.length > 5}
              />
            ))}
        </TagSelectorList>
      </div>
      <div className={globalStyles.formGroup}>
        <label className={globalStyles.label}>Personal Interests</label>
        <TagSelectorList>
          {options
            .filter((item) => item.interest_type == "P")
            .map((option) => (
              <TagSelector
                key={option.id}
                title={option.name}
                active={selectedOptions.some((item) => item.id == option.id)}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                option={option}
                disabled={selectedOptions.length > 5}
              />
            ))}
        </TagSelectorList>
      </div>

      <Actions
        actionText={`Next Step (${selectedOptions.length} of 6)`}
        // disabled={selectedOptions.length < 6}
      />
    </form>
  );
};

export default Interests;
