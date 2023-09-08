import Auth from "@/components/Auth/Auth";
import AuthWrapper from "@/components/Auth/AuthWrapper";
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
			</AuthWrapper>
		</>
	);
};

export default PasswordReset;
