import TagSelectorList from "../TagSelector/TagSelectorList/TagSelectorList";
import TagSelector from "../TagSelector/TagSelector/TagSelector";
import Actions from "../Actions/Actions";
import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import LoadingOverlay from "@/components/Layout/LoadingOverlay/LoadingOverlay";
import { Skill } from "@/interfaces/language.model";

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
        <TagSelectorList>
          {options.map((option) => (
            <TagSelector
              title={option.name}
              active={selectedOptions.some((item) => item.id == option.id)}
              setSelectedOptions={setSelectedOptions}
              selectedOptions={selectedOptions}
              option={option}
            />
          ))}
        </TagSelectorList>
        <Actions actionText="Get Started" />
      </form>
    </>
  );
};

export default Languages;
