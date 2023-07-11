import Auth from "@/components/Auth/Auth";
import AuthBanner from "@/components/Auth/AuthBanner";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import LoginForm from "@/components/Forms/Auth/LoginForm";
import ResetPasswordForm from "@/components/Forms/Auth/ResetPasswordForm/ResetPasswordForm";
import Head from "next/head";

const PasswordReset = () => {
	return (
		<>
			<Head>
				<title>Login | Coreer</title>
			</Head>
			<AuthWrapper>
				<Auth title="Reset your password">
					<ResetPasswordForm />
				</Auth>
				<AuthBanner />
			</AuthWrapper>
		</>
	);
};

export default PasswordReset;
