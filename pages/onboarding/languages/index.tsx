import LoginForm from "@/components/Forms/Auth/LoginForm";
import Head from "next/head";
import Auth from "@/components/Auth/Auth";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import AuthBanner from "@/components/Auth/AuthBanner";
import withGuest from "@/components/Route/withGuest";
import OnboardingWrapper from "@/components/Auth/Onboarding/OnboardingWrapper/OnboardingWrapper";
import { server } from "@/config";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import Languages from "@/components/Auth/Onboarding/Languages/Languages";
import { Skill } from "@/interfaces/language.model";

interface LanguagesProps {
  languages: { languages: Skill[] };
}

const Languages = ({ languages }: LanguagesProps) => {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Onboarding | Interests</title>
      </Head>
      <OnboardingWrapper title={"Languages"} description={"fasfasf asas asd"}>
        {user && (
          <LanguagesList
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

export default Languages;
