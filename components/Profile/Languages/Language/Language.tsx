import styles from "./Language.module.scss";
import { Skill } from "@/interfaces/language.model";

interface LanguageProps {
  language: Skill;
}

const Language = ({ language }: LanguageProps) => {
  return (
    <div className={styles.skill}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={language.image} />
      </div>

      <h4 className={styles.text}>{language.name}</h4>
    </div>
  );
};

export default Language;
