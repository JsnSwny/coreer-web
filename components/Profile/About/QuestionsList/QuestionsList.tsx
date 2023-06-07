import { UserAnswer } from "@/interfaces/question.model";
import QuestionBlock from "../QuestionBlock/QuestionBlock";
import styles from "./QuestionsList.module.scss";

interface QuestionsListProps {
  user_answers: UserAnswer[];
}

const QuestionsList = ({ user_answers }: QuestionsListProps) => {
  return (
    <ul className={styles.questionsList}>
      {user_answers.map((item: UserAnswer) => (
        <QuestionBlock item={item} />
      ))}
    </ul>
  );
};

export default QuestionsList;
