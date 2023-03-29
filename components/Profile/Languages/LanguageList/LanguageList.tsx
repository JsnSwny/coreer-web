import React from "react";
import Language from "../Language/Language";
import { Skill } from "@/interfaces/language.model";
import styles from "./LanguageList.module.scss";

interface LanguageListProps {
  languages: Skill[];
}

const LanguageList = ({ languages }: LanguageListProps) => {
  return (
    <div>
      <ul className={styles.skills}>
        {languages.map((item) => (
          <Language key={item.name} language={item} />
        ))}
      </ul>
    </div>
  );
};

export default LanguageList;
