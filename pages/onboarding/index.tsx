import withGuest from "@/components/Route/withGuest";
import Head from "next/head";

const Login = () => {
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

export default withGuest(Login);
