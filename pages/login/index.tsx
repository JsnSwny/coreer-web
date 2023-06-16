import Auth from "@/components/Auth/Auth";
import AuthBanner from "@/components/Auth/AuthBanner";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import LoginForm from "@/components/Forms/Auth/LoginForm";
import withGuest from "@/components/Route/withGuest";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login | Coreer</title>
      </Head>
      <AuthWrapper>
        <Auth title="Log in to your account">
          <LoginForm />
        </Auth>
        <AuthBanner />
      </AuthWrapper>
    </>
  );
};

export default withGuest(Login);
