import LoginForm from "@/components/Forms/Auth/LoginForm";
import Head from "next/head";
import Auth from "@/components/Auth/Auth";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import AuthBanner from "@/components/Auth/AuthBanner";
import withGuest from "@/components/Route/withGuest";
import OnboardingWrapper from "@/components/Auth/Onboarding/OnboardingWrapper/OnboardingWrapper";
import PersonalDetails from "@/components/Auth/Onboarding/PersonalDetails/PersonalDetails";

const personal_details = () => {
  return (
    <>
      <Head>
        <title>Onboarding | Personal Details</title>
      </Head>
      <OnboardingWrapper
        title={"Personal Details"}
        description={"fasfasf asas asd"}
      >
        <PersonalDetails />
      </OnboardingWrapper>
    </>
  );
};

export default personal_details;
