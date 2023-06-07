import globalStyles from "@/styles/globalStyles.module.scss";
import { FormEvent, useState } from "react";
import styles from "./AboutYou.module.scss";
import { useRouter } from "next/router";
import Actions from "../Actions/Actions";
import { useAuth } from "@/contexts/AuthContext";
import LocationSearchInput from "@/components/Forms/Inputs/LocationSearchInput";
import Select from "react-select";

const AboutYou = () => {
  const router = useRouter();
  const { user, updateUser, githubDetails } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // updateUser({ first_name: firstName, last_name: lastName, location });
    router.push("/onboarding/interests");
  };

  interface Option {
    value: string;
    label: string;
    group: "student" | "professional";
  }

  const [careerLevel, setCareerLevel] = useState<Option | null>(null);
  const [questionOneOption, setQuestionOneOption] = useState("");
  const [lookingFor, setLookingFor] = useState<Option[]>([]);
  const [questionOneAnswer, setQuestionOneAnswer] = useState("");

  const [questionTwoOption, setQuestionTwoOption] = useState("");
  const [questionTwoAnswer, setQuestionTwoAnswer] = useState("");

  const options: Option[] = [
    { value: "undergraduate", label: "Undergraduate", group: "student" },
    { value: "graduate", label: "Graduate", group: "student" },
    { value: "entry-level", label: "Entry Level", group: "professional" },
    { value: "experienced", label: "Experienced", group: "professional" },
  ];

  const groupedOptions = [
    {
      label: "Student",
      options: options.filter((option) => option.group === "student"),
    },
    {
      label: "Professional",
      options: options.filter((option) => option.group === "professional"),
    },
  ];

  const questionOptions = [
    {
      value: "1",
      label:
        "Describe a significant project or achievement you've completed during your studies that you are particularly proud of?",
      color: "#00B8D9",
    },
    {
      value: "2",
      label:
        "How do you envision applying the skills and knowledge you've gained in your tech studies to real-world scenarios or industry challenges?",
      color: "#0052CC",
    },
    {
      value: "3",
      label:
        "Are there any specific areas within the tech industry that you are particularly passionate about? If so, what draws you to those areas?",
      color: "#5243AA",
    },
    {
      value: "4",
      label:
        "Have you had any experiences collaborating with others on tech-related projects? Could you share an example and discuss what you learned from the experience?",
      color: "#5243AA",
    },
    {
      value: "5",
      label:
        "In what ways do you believe you can contribute to the tech industry and make a positive impact in the future?",
      color: "#5243AA",
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
            onChange={(selectedOption: Option) => {
              if (careerLevel && selectedOption.group != careerLevel.group)
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
            isOptionDisabled={(option: Option) =>
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
          isOptionDisabled={(option) => questionTwoOption.value == option.value}
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
          isOptionDisabled={(option) => questionOneOption.value == option.value}
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
          ></textarea>
        </div>
      )}

      <Actions />
    </form>
  );
};

export default AboutYou;
