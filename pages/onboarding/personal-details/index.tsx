import OnboardingWrapper from "@/components/Auth/Onboarding/OnboardingWrapper/OnboardingWrapper";
import PersonalDetails from "@/components/Auth/Onboarding/PersonalDetails/PersonalDetails";
import { useAuth } from "@/contexts/AuthContext";
import Head from "next/head";

const PersonalDetailsPage = () => {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Onboarding | Personal Details</title>
      </Head>
      <OnboardingWrapper title={"Personal Details"}>
        <PersonalDetails />
      </OnboardingWrapper>
    </>
  );
};

export default PersonalDetailsPage;
