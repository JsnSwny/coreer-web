import FormError from "@/components/Forms/Error/FormError";
import { useAuth } from "@/contexts/AuthContext";
import { CareerLevel } from "@/interfaces/profile.model";
import { Question } from "@/interfaces/question.model";
import globalStyles from "@/styles/globalStyles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import * as yup from "yup";
import Actions from "../Actions/Actions";
import styles from "./AboutYou.module.scss";

const schema = yup.object().shape({
  current_level: yup.string().required("Current level is required"),
  looking_for: yup.array().min(1, "Looking for must have at least 1 selected").required(),
});

interface AboutYouProps {
  questions: Question[];
  careerLevels: CareerLevel[];
}

const AboutYou = ({ questions, careerLevels }: AboutYouProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    resetField,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const currentLevelValue = watch("current_level");

  const router = useRouter();
  const { user, updateUser } = useAuth();

  const onSubmitHandler = async (data: { current_level: string; looking_for: string[] }) => {
    console.log(data);
    const selectedQuestions = [questionOneOption, questionTwoOption];
    const selectedAnswers = [questionOneAnswer, questionTwoAnswer];

    updateUser({
      current_level_id: parseInt(data.current_level),
      looking_for_id: data.looking_for.map((item) => parseInt(item)),
    });

    // try {
    // 	const requestPromises = selectedQuestions.map((question: any, index) => {
    // 		return axios.post(`${server}/api/user-answers/`, {
    // 			user: user!.id,
    // 			question_id: question?.value,
    // 			answer: selectedAnswers[index],
    // 		});
    // 	});

    // 	const responses = await axios.all(requestPromises);
    // 	responses.forEach((response) => {
    // 		console.log(response.data);
    // 	});
    // } catch (error) {
    // 	console.error(error);
    // }
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
  const [questionOneOption, setQuestionOneOption] = useState<Option | null | undefined>(null);
  const [lookingFor, setLookingFor] = useState<Option[]>([]);
  const [questionOneAnswer, setQuestionOneAnswer] = useState("");

  const [questionTwoOption, setQuestionTwoOption] = useState<Option | null | undefined>(null);
  const [questionTwoAnswer, setQuestionTwoAnswer] = useState("");

  useEffect(() => {
    if (user) {
      if (user.user_answers) {
        setQuestionOneOption(
          questionOptions.find(
            (item: Option) => parseInt(item.value) == user.user_answers[0]?.question.id,
          ),
        );
        setQuestionTwoOption(
          questionOptions.find(
            (item: Option) => parseInt(item.value) == user.user_answers[1]?.question.id,
          ),
        );
        setQuestionOneAnswer(user.user_answers[0]?.answer);
        setQuestionTwoAnswer(user.user_answers[1]?.answer);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user?.current_level && user?.looking_for) {
      reset({
        current_level: String(user!.current_level.id),
        looking_for: user!.looking_for.map((item) => String(item.id)),
      });
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
    <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
      <div className={globalStyles.formTwoColumn}>
        <div className={globalStyles.formGroup}>
          <label htmlFor="career_level" className={globalStyles.label}>
            Career Level*
          </label>
          <Controller
            control={control}
            name="current_level"
            render={({ field }) => (
              <Select
                options={groupedOptions}
                onChange={(val) => {
                  if (
                    val?.group != options.find((item) => item.value == currentLevelValue)?.group
                  ) {
                    reset({
                      current_level: val?.value,
                      looking_for: [],
                    });
                  } else {
                    field.onChange(val?.value);
                  }
                }}
                value={
                  field.value ? options.filter((item) => field.value.includes(item.value)) : null
                }
              />
            )}
          />

          <FormError message={errors.current_level?.message} />
        </div>
        <div className={globalStyles.formGroup}>
          <label htmlFor="looking_for" className={globalStyles.label}>
            Looking for*
          </label>
          <Controller
            control={control}
            name="looking_for"
            render={({ field }) => (
              <Select
                options={groupedOptions}
                onChange={(val) => field.onChange(val.map((c) => c.value))}
                isMulti
                value={field.value && options.filter((c) => field.value.includes(c.value))}
                isOptionDisabled={(option) =>
                  option.group == options.find((item) => item.value == currentLevelValue)?.group
                }
              />
            )}
          />

          <FormError message={errors.looking_for?.message} />
        </div>
      </div>

      {/* <div className={globalStyles.formGroup}>
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
			)} */}

      <Actions />
    </form>
  );
};

export default AboutYou;
