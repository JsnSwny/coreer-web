import LoginForm from "@/components/Forms/Auth/LoginForm";
import Head from "next/head";
import Auth from "@/components/Auth/Auth";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import AuthBanner from "@/components/Auth/AuthBanner";
import withGuest from "@/components/Route/withGuest";
import OnboardingWrapper from "@/components/Auth/Onboarding/OnboardingWrapper/OnboardingWrapper";
import PersonalDetails from "@/components/Auth/Onboarding/PersonalDetails/PersonalDetails";

const languages = () => {
  return (
    <>
      <Head>
        <title>Onboarding | Languages</title>
      </Head>
      <OnboardingWrapper title={"Languages"} description={"fasfasf asas asd"}>
        <PersonalDetails />
      </OnboardingWrapper>
    </>
  );
};

export default languages;
