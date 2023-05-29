import SignupForm from "@/components/Forms/Signup/SignupForm";
import Head from "next/head";
import Auth from "@/components/Auth/Auth";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import AuthBanner from "@/components/Auth/AuthBanner";
import withGuest from "@/components/Route/withGuest";

const login = () => {
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

export default withGuest(login);
