import { UserAnswer } from "@/interfaces/question.model";
import QuestionBlock from "../QuestionBlock/QuestionBlock";
import styles from "./QuestionsList.module.scss";

interface QuestionsListProps {
  user_answers: UserAnswer[];
  showEdit: boolean;
}

const QuestionsList = ({ user_answers, showEdit }: QuestionsListProps) => {
  return (
    <ul className={styles.questionsList}>
      {user_answers.map((item: UserAnswer) => (
        <QuestionBlock key={item.id} item={item} showEdit={showEdit} />
      ))}
    </ul>
  );
};

export default QuestionsList;
