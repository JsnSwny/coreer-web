import LoginForm from "@/components/Forms/Auth/LoginForm";
import Head from "next/head";
import Auth from "@/components/Auth/Auth";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import AuthBanner from "@/components/Auth/AuthBanner";
import withGuest from "@/components/Route/withGuest";
import OnboardingWrapper from "@/components/Auth/Onboarding/OnboardingWrapper/OnboardingWrapper";
import PersonalDetails from "@/components/Auth/Onboarding/PersonalDetails/PersonalDetails";
import { useAuth } from "@/contexts/AuthContext";
import AboutYou from "@/components/Auth/Onboarding/AboutYou/AboutYou";
import axios from "axios";
import { server } from "@/config";

const AboutYouPage = ({ questions, careerLevels }) => {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Onboarding | About you</title>
      </Head>
      <OnboardingWrapper title={"About You"} description={"fasfasf asas asd"}>
        <AboutYou questions={questions} careerLevels={careerLevels} />
      </OnboardingWrapper>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  let questions: any = [];
  let careerLevels: any = [];
  await axios
    .get(`${server}/api/questions/`)
    .then((res) => {
      questions = res.data;
    })
    .catch((err) => {
      console.log("error");
      console.log(err.response);
    });

  await axios
    .get(`${server}/api/career-levels/`)
    .then((res) => {
      careerLevels = res.data;
    })
    .catch((err) => {
      console.log("error");
      console.log(err.response);
    });
  return {
    props: {
      questions,
      careerLevels,
    },
  };
};

export default AboutYouPage;
