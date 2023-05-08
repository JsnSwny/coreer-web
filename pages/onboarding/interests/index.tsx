import LoginForm from "@/components/Forms/Auth/LoginForm";
import Head from "next/head";
import Auth from "@/components/Auth/Auth";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import AuthBanner from "@/components/Auth/AuthBanner";
import withGuest from "@/components/Route/withGuest";
import OnboardingWrapper from "@/components/Auth/Onboarding/OnboardingWrapper/OnboardingWrapper";
import PersonalDetails from "@/components/Auth/Onboarding/PersonalDetails/PersonalDetails";
import Interests from "@/components/Auth/Onboarding/Interests/Interest";

const interests = () => {
  return (
    <>
      <Head>
        <title>Onboarding | Interests</title>
      </Head>
      <OnboardingWrapper title={"Interests"} description={"fasfasf asas asd"}>
        <Interests />
      </OnboardingWrapper>
    </>
  );
};

export default interests;
