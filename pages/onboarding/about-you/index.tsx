import AboutYou from "@/components/Auth/Onboarding/AboutYou/AboutYou";
import OnboardingWrapper from "@/components/Auth/Onboarding/OnboardingWrapper/OnboardingWrapper";
import { server } from "@/config";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { CareerLevel } from "../../../interfaces/profile.model";
import { Question } from "../../../interfaces/question.model";

type Props = {
  questions: Question[];
  careerLevels: CareerLevel[];
};

const AboutYouPage: NextPage<Props> = ({ questions, careerLevels }) => {
  return (
    <>
      <Head>
        <title>Onboarding | About you</title>
      </Head>
      <OnboardingWrapper
        title={"About You"}
        description={"Where are you in your career and who do you want to find on Coreer?"}
      >
        <AboutYou questions={questions} careerLevels={careerLevels} />
      </OnboardingWrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  let questions: Question[] = [];
  let careerLevels: CareerLevel[] = [];

  try {
    const questionsPromise = axios.get<Question[]>(`${server}/api/questions/`);
    const careerLevelsPromise = axios.get<CareerLevel[]>(`${server}/api/career-levels/`);

    questions = (await questionsPromise).data;
    careerLevels = (await careerLevelsPromise).data;
  } catch (err: any) {
    console.log(err.response);
    // TODO(sean): Maybe want to respond with an error here, this will default to just rendering with empty questions / career levels
  }
  return {
    props: {
      questions,
      careerLevels,
    },
  };
};

export default AboutYouPage;
