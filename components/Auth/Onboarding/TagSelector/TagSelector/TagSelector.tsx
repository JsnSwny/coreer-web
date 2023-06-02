import { useState } from "react";
import styles from "./TagSelector.module.scss";

interface Option {
  id: number;
}

interface TagSelectorProps<T extends Option> {
  title: string;
  active: boolean;
  selectedOptions: T[];
  setSelectedOptions: (options: T[]) => void;
  option: T;
}

const TagSelector = <T extends Option>({
  title,
  active,
  selectedOptions,
  setSelectedOptions,
  option,
}: TagSelectorProps<T>) => {
  const handleClick = () => {
    if (selectedOptions.some((item) => item.id === option.id)) {
      setSelectedOptions(
        selectedOptions.filter((item) => item.id !== option.id)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <li
      className={`${styles.tag} ${active ? styles.active : ""}`}
      onClick={handleClick}
    >
      {title}
    </li>
  );
};

export default TagSelector;
