import LoginForm from "@/components/Forms/Auth/LoginForm";
import Head from "next/head";
import Auth from "@/components/Auth/Auth";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import AuthBanner from "@/components/Auth/AuthBanner";
import withGuest from "@/components/Route/withGuest";
import OnboardingWrapper from "@/components/Auth/Onboarding/OnboardingWrapper/OnboardingWrapper";
import PersonalDetails from "@/components/Auth/Onboarding/PersonalDetails/PersonalDetails";
import Interests from "@/components/Auth/Onboarding/Interests/Interest";
import { server } from "@/config";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { Interest } from "@/interfaces/interest.model";

interface InterestsProps {
	interests: Interest[];
}

const InterestsPage = ({ interests }: InterestsProps) => {
	const { user } = useAuth();
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Onboarding | Interests</title>
			</Head>
			{user && (
				<OnboardingWrapper
					title={"Interests"}
					description={"Select up to 6 interests that are relevant to you"}
				>
					<Interests options={interests} defaultOptions={user.interests} />
				</OnboardingWrapper>
			)}
		</>
	);
};

export const getServerSideProps = async (context: any) => {
	const { req } = context;
	// const cookies = cookie.parse(req.headers.cookie || "");
	// const token = cookies.token;
	// console.log("GETTING RECS");
	// const config = {
	//   headers: {
	//     "Content-Type": "application/json",
	//   },
	// };
	let interestsRes: any = [];
	await axios
		.get(`${server}/api/interests`)
		.then((res) => {
			interestsRes = res.data;
		})
		.catch((err) => {
			console.log("error");
			console.log(err.response);
		});
	return {
		props: {
			interests: interestsRes,
		},
	};
};

export default InterestsPage;
