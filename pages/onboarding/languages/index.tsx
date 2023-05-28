import LoginForm from "@/components/Forms/Auth/LoginForm";
import Head from "next/head";
import Auth from "@/components/Auth/Auth";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import AuthBanner from "@/components/Auth/AuthBanner";
import withGuest from "@/components/Route/withGuest";
import OnboardingWrapper from "@/components/Auth/Onboarding/OnboardingWrapper/OnboardingWrapper";
import PersonalDetails from "@/components/Auth/Onboarding/PersonalDetails/PersonalDetails";
import Interests from "@/components/Auth/Onboarding/Interests/Interest";
import { server } from "@/config";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import Languages from "@/components/Auth/Onboarding/Languages/Languages";

const languages = ({ languages }) => {
  const { user, updateUser } = useAuth();
  console.log(user);
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Onboarding | Interests</title>
      </Head>
      <OnboardingWrapper title={"Languages"} description={"fasfasf asas asd"}>
        {user && (
          <Languages
            options={languages.languages}
            defaultOptions={user.languages}
            updateKey="languages_id"
          />
        )}
      </OnboardingWrapper>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { req } = context;
  let languagesRes: any = [];
  await axios
    .get(`${server}/most-popular-languages/`)
    .then((res) => {
      console.log(res.data);
      languagesRes = res.data;
    })
    .catch((err) => {
      console.log("error");
      console.log(err.response);
    });
  return {
    props: {
      languages: languagesRes,
    },
  };
};

export default languages;
