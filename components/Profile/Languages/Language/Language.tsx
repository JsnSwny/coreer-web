import styles from "./Language.module.scss";
import { Skill } from "@/interfaces/language.model";

interface LanguageProps {
  language: Skill;
}

const Language = ({ language }: LanguageProps) => {
  return (
    <div className={styles.skill}>
      <img className={styles.image} src={`https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/${language.icon_name.toLowerCase()}/${language.icon_name.toLowerCase()}-original.svg`} />
      <h4 className={styles.text}>{language.name}</h4>
    </div>
  );
};

export default Language;
