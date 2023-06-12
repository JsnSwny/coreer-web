import TagSelectorList from "../TagSelector/TagSelectorList/TagSelectorList";
import TagSelector from "../TagSelector/TagSelector/TagSelector";
import Actions from "../Actions/Actions";
import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import LoadingOverlay from "@/components/Layout/LoadingOverlay/LoadingOverlay";
import { Skill } from "@/interfaces/language.model";
import globalStyles from "@/styles/globalStyles.module.scss";

interface LanguagesProps {
  options: Skill[];
  defaultOptions: Skill[];
  updateKey: string;
}

const Languages = ({ options, defaultOptions, updateKey }: LanguagesProps) => {
  const { user, updateUser, loading } = useAuth();
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateUser({
      [updateKey]: selectedOptions.map((item) => item.id),
      onboarded: true,
    });
    router.push("/");
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <form onSubmit={handleSubmit}>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Languages</label>
          <TagSelectorList>
            {options
              .filter((item) => item.category == "L")
              .map((option) => (
                <TagSelector
                  key={option.id}
                  title={option.name}
                  active={selectedOptions.some((item) => item.id == option.id)}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  option={option}
                />
              ))}
          </TagSelectorList>
        </div>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Frameworks</label>
          <TagSelectorList>
            {options
              .filter((item) => item.category == "F")
              .map((option) => (
                <TagSelector
                  key={option.id}
                  title={option.name}
                  active={selectedOptions.some((item) => item.id == option.id)}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  option={option}
                />
              ))}
          </TagSelectorList>
        </div>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Other</label>
          <TagSelectorList>
            {options
              .filter((item) => item.category == "O")
              .map((option) => (
                <TagSelector
                  key={option.id}
                  title={option.name}
                  active={selectedOptions.some((item) => item.id == option.id)}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  option={option}
                />
              ))}
          </TagSelectorList>
        </div>
        <Actions actionText="Get Started" />
      </form>
    </>
  );
};

export default Languages;
