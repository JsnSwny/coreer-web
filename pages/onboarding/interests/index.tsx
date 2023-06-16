import Interests from "@/components/Auth/Onboarding/Interests/Interest";
import OnboardingWrapper from "@/components/Auth/Onboarding/OnboardingWrapper/OnboardingWrapper";
import { server } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { Interest } from "@/interfaces/interest.model";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

interface InterestsProps {
  interests: Interest[];
}

const InterestsPage = ({ interests }: InterestsProps) => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Onboarding | Interests</title>
      </Head>
      {user && (
        <OnboardingWrapper
          title={"Interests"}
          description={"Select up to 6 interests that are relevant to you"}
        >
          <Interests options={interests} defaultOptions={user.interests} />
        </OnboardingWrapper>
      )}
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { req } = context;
  // const cookies = cookie.parse(req.headers.cookie || "");
  // const token = cookies.token;
  // console.log("GETTING RECS");
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };
  let interestsRes: any = [];
  await axios
    .get(`${server}/api/interests`)
    .then((res) => {
      interestsRes = res.data;
    })
    .catch((err) => {
      console.log("error");
      console.log(err.response);
    });
  return {
    props: {
      interests: interestsRes,
    },
  };
};

export default InterestsPage;
