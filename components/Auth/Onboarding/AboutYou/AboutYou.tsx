import globalStyles from "@/styles/globalStyles.module.scss";
import { FormEvent, useState } from "react";
import styles from "./AboutYou.module.scss";
import { useRouter } from "next/router";
import Actions from "../Actions/Actions";
import { useAuth } from "@/contexts/AuthContext";
import LocationSearchInput from "@/components/Forms/Inputs/LocationSearchInput";
import Select from "react-select";
import axios from "axios";
import { server } from "@/config";
import { useEffect } from "react";
import { Question } from "@/interfaces/question.model";
import { CareerLevel } from "@/interfaces/profile.model";

interface AboutYouProps {
  questions: Question[];
  careerLevels: CareerLevel[];
}

const AboutYou = ({ questions, careerLevels }: AboutYouProps) => {
  const router = useRouter();
  const { user, updateUser } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const selectedQuestions = [questionOneOption, questionTwoOption];
    const selectedAnswers = [questionOneAnswer, questionTwoAnswer];
    if (careerLevel && lookingFor) {
      updateUser({
        current_level_id: parseInt(careerLevel?.value),
        looking_for_id: lookingFor.map((item) => parseInt(item.value)),
      });
    }

    try {
      const requestPromises = selectedQuestions.map((question: any, index) => {
        return axios.post(`${server}/api/user-answers/`, {
          user: user!.id,
          question_id: question?.value,
          answer: selectedAnswers[index],
        });
      });

      const responses = await axios.all(requestPromises);
      responses.forEach((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.error(error);
    }
    router.push("/onboarding/interests");
  };

  interface Option {
    value: string;
    label: string;
    group: "S" | "P";
  }

  const questionOptions: Option[] = questions.map((item) => ({
    value: String(item.id),
    label: item.text,
    group: "S",
  }));

  const [careerLevel, setCareerLevel] = useState<Option | null>(null);
  const [questionOneOption, setQuestionOneOption] = useState<
    Option | null | undefined
  >(null);
  const [lookingFor, setLookingFor] = useState<Option[]>([]);
  const [questionOneAnswer, setQuestionOneAnswer] = useState("");

  const [questionTwoOption, setQuestionTwoOption] = useState<
    Option | null | undefined
  >(null);
  const [questionTwoAnswer, setQuestionTwoAnswer] = useState("");

  useEffect(() => {
    if (user) {
      if (user.user_answers) {
        setQuestionOneOption(
          questionOptions.find(
            (item: Option) =>
              parseInt(item.value) == user.user_answers[0]?.question.id
          )
        );
        setQuestionTwoOption(
          questionOptions.find(
            (item: Option) =>
              parseInt(item.value) == user.user_answers[1]?.question.id
          )
        );
        setQuestionOneAnswer(user.user_answers[0]?.answer);
        setQuestionTwoAnswer(user.user_answers[1]?.answer);
      }
    }
  }, [user]);

  const options: Option[] = careerLevels.map((item) => ({
    value: String(item.id),
    label: item.name,
    group: item.level_type,
  }));

  const groupedOptions = [
    {
      label: "Student",
      options: options.filter((option) => option.group === "S"),
    },
    {
      label: "Professional",
      options: options.filter((option) => option.group === "P"),
    },
  ];

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={globalStyles.formTwoColumn}>
        <div className={globalStyles.formGroup}>
          <label htmlFor="career_level" className={globalStyles.label}>
            Career Level*
          </label>
          <Select
            options={groupedOptions}
            onChange={(selectedOption) => {
              if (careerLevel && selectedOption?.group != careerLevel.group)
                setLookingFor([]);
              setCareerLevel(selectedOption);
            }}
            value={careerLevel}
          />
        </div>
        <div className={globalStyles.formGroup}>
          <label htmlFor="looking_for" className={globalStyles.label}>
            Looking for*
          </label>
          <Select
            options={groupedOptions}
            onChange={(selectedOption) => setLookingFor(selectedOption)}
            isOptionDisabled={(option) =>
              careerLevel && option.group == careerLevel.group
            }
            value={lookingFor}
            isMulti
          />
        </div>
      </div>

      <div className={globalStyles.formGroup}>
        <label htmlFor="first_name" className={globalStyles.label}>
          Question 1*
        </label>
        <Select
          options={questionOptions}
          onChange={(selectedOption) => setQuestionOneOption(selectedOption)}
          value={questionOneOption}
          isOptionDisabled={(option) =>
            questionTwoOption?.value == option.value
          }
        />
      </div>

      {questionOneOption && (
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>
            {questionOneOption.label}
          </label>
          <textarea
            placeholder="Question 1 Answer..."
            className={globalStyles.input}
            rows={4}
            value={questionOneAnswer}
            onChange={(e) => setQuestionOneAnswer(e.target.value)}
          ></textarea>
        </div>
      )}

      <div className={globalStyles.formGroup}>
        <label htmlFor="first_name" className={globalStyles.label}>
          Question 2
        </label>
        <Select
          options={questionOptions}
          onChange={(selectedOption) => setQuestionTwoOption(selectedOption)}
          value={questionTwoOption}
          isOptionDisabled={(option) =>
            questionOneOption?.value == option.value
          }
        />
      </div>

      {questionTwoOption && (
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>
            {questionTwoOption.label}
          </label>
          <textarea
            placeholder="Question 2 Answer..."
            className={globalStyles.input}
            rows={4}
            value={questionTwoAnswer}
            onChange={(e) => setQuestionTwoAnswer(e.target.value)}
          ></textarea>
        </div>
      )}

      <Actions />
    </form>
  );
};

export default AboutYou;
