import Head from "next/head";
import withGuest from "@/components/Route/withGuest";

const Login = () => {
	return (
		<>
			<Head>
				<title>Onboarding | Personal Details</title>
			</Head>
		</>
	);
};

export default withGuest(Login);
