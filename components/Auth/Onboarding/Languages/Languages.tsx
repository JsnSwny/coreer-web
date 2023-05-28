import TagSelectorList from "../TagSelector/TagSelectorList/TagSelectorList";
import TagSelector from "../TagSelector/TagSelector/TagSelector";
import Actions from "../Actions/Actions";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import LoadingOverlay from "@/components/Layout/LoadingOverlay/LoadingOverlay";

interface LanguagesProps {
  options: object[];
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
              onClick={() => {
                setSelectedOptions([...selectedOptions, option]);
                updateUser({
                  [updateKey]: [...selectedOptions, option].map(
                    (item) => item.id
                  ),
                });
              }}
            />
          ))}
        </TagSelectorList>
        <Actions actionText="Get Started" />
      </form>
    </>
  );
};

export default Languages;
