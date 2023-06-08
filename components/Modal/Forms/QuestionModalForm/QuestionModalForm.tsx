import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { ChangeEvent, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import LocationSearchInput from "@/components/Forms/Inputs/LocationSearchInput";
import Select from "react-select";
import { server } from "@/config";
import axios from "axios";
import {
  Question,
  UserAnswer,
  UserAnswerRequest,
} from "@/interfaces/question.model";
import { StringLiteral } from "typescript";
import { updateUserAnswer } from "@/api/questions";

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
  const [selectedQuestion, setSelectedQuestion] = useState<
    Option | null | undefined
  >(null);
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
            userAnswer.id === updatedUserAnswer.id
              ? updatedUserAnswer
              : userAnswer
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

  useEffect(() => {
    axios.get(`${server}/api/questions/`).then((res: any) => {
      const questionOptions = res.data.map((item: Question) => ({
        value: item.id,
        label: item.text,
      }));
      setQuestionOptions(questionOptions);
      if (userAnswer) {
        setSelectedQuestion(
          questionOptions.find(
            (item: Option) => parseInt(item.value) == userAnswer.question.id
          )
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
        <Button text="Save" onClick={handleSave} />
      </div>
    </>
  );
};

export default QuestionModalForm;
