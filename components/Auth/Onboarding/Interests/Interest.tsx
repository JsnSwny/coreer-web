import TagSelectorList from "../TagSelector/TagSelectorList/TagSelectorList";
import TagSelector from "../TagSelector/TagSelector/TagSelector";
import Actions from "../Actions/Actions";
import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { Interest } from "@/interfaces/interest.model";

interface InterestsProps {
  options: Interest[];
  defaultOptions: Interest[];
}

const Interests = ({ options, defaultOptions }: InterestsProps) => {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/onboarding/languages");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TagSelectorList>
        {options.map((option) => (
          <TagSelector
            title={option.name}
            active={selectedOptions.some((item) => item.id == option.id)}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            option={option}
          />
        ))}
      </TagSelectorList>
      <Actions />
    </form>
  );
};

export default Interests;
