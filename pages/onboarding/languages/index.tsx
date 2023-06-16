import Languages from "@/components/Auth/Onboarding/Languages/Languages";
import OnboardingWrapper from "@/components/Auth/Onboarding/OnboardingWrapper/OnboardingWrapper";
import { server } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { Skill } from "@/interfaces/language.model";
import axios from "axios";
import Head from "next/head";

interface LanguagesProps {
  languages: { languages: Skill[] };
}

const LanguagesPage = ({ languages }: LanguagesProps) => {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Onboarding | Skills</title>
      </Head>
      <OnboardingWrapper
        title={"Skills"}
        description={"Select the skills that you are proficient or interested in"}
      >
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

export default LanguagesPage;
