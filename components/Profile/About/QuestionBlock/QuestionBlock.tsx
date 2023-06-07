import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./QuestionBlock.module.scss";
import { FaQuestion } from "react-icons/fa";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { UserAnswer } from "@/interfaces/question.model";

interface QuestionBlockProps {
  item: UserAnswer;
}

const QuestionBlock = ({ item }: QuestionBlockProps) => {
  return (
    <li className={styles.questionBlock}>
      {/* <FaQuestion className={styles.icon} /> */}
      <FontAwesomeIcon icon={faQuestion} className={styles.icon} />
      <h2>{item.question.text}</h2>
      <p>{item.answer}</p>
    </li>
  );
};

export default QuestionBlock;
