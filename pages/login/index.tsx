import LoginForm from "@/components/Forms/Auth/LoginForm";
import Head from "next/head";
import Auth from "@/components/Auth/Auth";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import AuthBanner from "@/components/Auth/AuthBanner";
import withGuest from "@/components/Route/withGuest";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

const login = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if the current URL has the authorization code
    console.log(router.query);
    const code = router.query.code;

    if (code) {
      // If the authorization code is present, exchange it for an access token
      exchangeCodeForToken(code);
    }
  }, []);

  const exchangeCodeForToken = async (code: string) => {
    // Make a POST request to your Django REST Framework backend endpoint

    console.log({
      code,
      client_secret: "b25d6182b479630ac988f58ffe952b21a48e7cca",
      client_id: "4710f43b56ca1572e2a8",
    });

    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        headers: {
          "Content-Type": "application/json",
          Access: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          code,
          client_secret: "b25d6182b479630ac988f58ffe952b21a48e7cca",
          client_id: "4710f43b56ca1572e2a8",
        },
      }
    );

    if (response.status === 200) {
      const data = await response.data;
      const accessToken = data.access_token;

      // Store the access token in local storage or a state management solution
      localStorage.setItem("token", accessToken);

      console.log("Got Token");
      console.log(accessToken);
    } else {
      // Handle error case
    }
  };
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

export default withGuest(login);
