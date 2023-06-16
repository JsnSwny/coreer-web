import { deleteUserAnswer, updateUserAnswer } from "@/api/questions";
import Button from "@/components/Button/Button";
import { server } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { Question, UserAnswer, UserAnswerRequest } from "@/interfaces/question.model";
import globalStyles from "@/styles/globalStyles.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

interface ModalFormProps {
  closeModal: () => void;
  userAnswer?: UserAnswer;
}

type Option = {
  value: string;
  label: string;
};

const QuestionModalForm = ({ closeModal, userAnswer }: ModalFormProps) => {
  const { user, setUser } = useAuth();
  const [answer, setAnswer] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<Option | null | undefined>(null);
  const [questionOptions, setQuestionOptions] = useState([]);

  const handleSave = async () => {
    if (selectedQuestion && answer) {
      let obj: UserAnswerRequest = {
        user: user!.id,
        question_id: parseInt(selectedQuestion.value),
        answer,
      };
      if (userAnswer) {
        // Update existing project
        const updatedUserAnswer = await updateUserAnswer(userAnswer.id, obj);
        console.log(updatedUserAnswer);

        setUser({
          ...user!,
          user_answers: user!.user_answers.map((userAnswer) =>
            userAnswer.id === updatedUserAnswer.id ? updatedUserAnswer : userAnswer,
          ),
        });
      } else {
        // Add new project
        // const newProject = await addProject(obj);
        // setUser({ ...user!, projects: [...user!.projects, newProject] });
      }
      closeModal();
    }
  };

  const handleDelete = async () => {
    deleteUserAnswer(userAnswer!.id);
    setUser({
      ...user!,
      user_answers: [...user!.user_answers.filter((item) => userAnswer!.id != item!.id)],
    });
    closeModal();
  };

  useEffect(() => {
    axios.get(`${server}/api/questions/`).then((res: any) => {
      const questionOptions = res.data.map((item: Question) => ({
        value: item.id,
        label: item.text,
      }));
      setQuestionOptions(questionOptions);
      if (userAnswer) {
        setSelectedQuestion(
          questionOptions.find((item: Option) => parseInt(item.value) == userAnswer.question.id),
        );
        setAnswer(userAnswer.answer);
      }
    });
  }, []);

  return (
    <>
      <div className={globalStyles.modalBody}>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Question</label>
          <div className={globalStyles.formGroup}>
            <Select
              options={questionOptions}
              onChange={(selectedOption) => setSelectedQuestion(selectedOption)}
              value={selectedQuestion}
              //   isOptionDisabled={(option) =>
              //     questionTwoOption?.value == option.value
              //   }
            />
          </div>
        </div>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Answer</label>
          <textarea
            className={globalStyles.input}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
          ></textarea>
        </div>
      </div>
      <div className={globalStyles.modalFooter}>
        {userAnswer && <Button text="Delete" color="red" onClick={handleDelete} />}
        <div className={globalStyles.modalFooterRight}>
          <Button text="Save" onClick={handleSave} />
        </div>
      </div>
    </>
  );
};

export default QuestionModalForm;
