import LoginForm from "@/components/Forms/Auth/LoginForm";
import Head from "next/head";
import Auth from "@/components/Auth/Auth";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import AuthBanner from "@/components/Auth/AuthBanner";
import withGuest from "@/components/Route/withGuest";

const login = () => {
  return (
    <>
      <Head>
        <title>Onboarding | Personal Details</title>
      </Head>
      {/* <AuthWrapper>
        <Auth title="Onboarding">
          <p>est</p>
        </Auth>
        <AuthBanner />
      </AuthWrapper> */}
    </>
  );
};

export default withGuest(login);
