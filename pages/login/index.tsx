import LoginForm from "@/components/Forms/Auth/LoginForm";
import Head from "next/head";
import Auth from "@/components/Auth/Auth";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import withGuest from "@/components/Route/withGuest";

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
			</AuthWrapper>
		</>
	);
};

export default withGuest(Login);
