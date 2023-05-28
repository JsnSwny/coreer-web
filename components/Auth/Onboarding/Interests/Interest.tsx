import TagSelectorList from "../TagSelector/TagSelectorList/TagSelectorList";
import TagSelector from "../TagSelector/TagSelector/TagSelector";
import Actions from "../Actions/Actions";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

interface InterestsProps {
  options: object[];
}

const Interests = ({
  options,
  defaultOptions,
  updateKey,
  onSubmit,
}: InterestsProps) => {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // updateUser({ [updateKey]: selectedOptions.map((item) => item.id) });
    onSubmit();
  };

  return (
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
      <Actions />
    </form>
  );
};

export default Interests;
