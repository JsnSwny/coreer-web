import QuestionBlock from "../QuestionBlock/QuestionBlock";
import styles from "./QuestionsList.module.scss";

const QuestionsList = () => {
  return (
    <ul className={styles.questionsList}>
      <QuestionBlock />
      <QuestionBlock />
    </ul>
  );
};

export default QuestionsList;
