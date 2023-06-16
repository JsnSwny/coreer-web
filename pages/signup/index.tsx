import Auth from "@/components/Auth/Auth";
import AuthBanner from "@/components/Auth/AuthBanner";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import SignupForm from "@/components/Forms/Signup/SignupForm";
import withGuest from "@/components/Route/withGuest";
import Head from "next/head";

const SignUp = () => {
  return (
    <>
      <Head>
        <title>Signup | Coreer</title>
      </Head>
      <AuthWrapper>
        <Auth title="Create an account">
          <SignupForm />
        </Auth>
        <AuthBanner />
      </AuthWrapper>
    </>
  );
};

export default withGuest(SignUp);
