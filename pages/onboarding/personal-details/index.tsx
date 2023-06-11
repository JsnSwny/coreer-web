import LoginForm from "@/components/Forms/Auth/LoginForm";
import Head from "next/head";
import Auth from "@/components/Auth/Auth";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import AuthBanner from "@/components/Auth/AuthBanner";
import withGuest from "@/components/Route/withGuest";
import OnboardingWrapper from "@/components/Auth/Onboarding/OnboardingWrapper/OnboardingWrapper";
import { useAuth } from "@/contexts/AuthContext";

const PersonalDetails = () => {
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

export default PersonalDetails;
