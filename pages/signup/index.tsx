import SignupForm from "@/components/Forms/Signup/SignupForm";
import Head from "next/head";
import Auth from "@/components/Auth/Auth";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import withGuest from "@/components/Route/withGuest";

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
			</AuthWrapper>
		</>
	);
};

export default withGuest(SignUp);
