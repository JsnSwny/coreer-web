import { FaGithub } from "react-icons/fa";
import styles from "./GithubAuth.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "@/config";
import LoadingOverlay from "@/components/Layout/LoadingOverlay/LoadingOverlay";

const GithubAuth = () => {
	const { fetchUser, setGithubToken, updateProfilePicture } = useAuth();
	const router = useRouter();
	const [loadingAuth, setLoadingAuth] = useState(false);

	const convertUrlToFile = async (imageUrl: string) => {
		try {
			const response = await fetch(imageUrl);
			const contentType = response.headers.get("Content-Type") ?? "image/jpeg"; // default to jpg if not found, unlikely
			const extension = contentType.split("/")[1];

			const blob = await response.blob();

			const file = new File([blob], "profile_image." + extension, {
				type: contentType,
			});

			return file;
		} catch (error) {
			console.log("Failed to convert image URL to file:", error);
			return null;
		}
	};

	useEffect(() => {
		const code = router.query.code;
		if (code) {
			setLoadingAuth(true);
			axios
				.post(`${server}/exchange-token/`, { code })
				.then((res) => {
					let accessToken = res.data.access_token;
					axios
						.post(`${server}/api/github/`, {
							code,
							access_token: accessToken,
						})
						.then(async (res) => {
							const { key } = res.data;
							setGithubToken(accessToken);

							const user = await fetchUser(key);

							// Todo: Figure out a better way to conditionally upload github profile picture
							// if (!user.onboarded) {
							//   let extra_data = user.social_account.extra_data;
							//   const jsonString = extra_data
							//     .replace(/False/g, "false")
							//     .replace(/True/g, "true")
							//     .replace(/None/g, "null")
							//     .replace(/'/g, '"');

							//   const jsonObject = JSON.parse(jsonString);
							//   const file = await convertUrlToFile(jsonObject.avatar_url);
							//   if (file) {
							//     updateProfilePicture(user.id, key, file);
							//   }
							// }
						})
						.catch((err) => console.log(err.response))
						.finally(() => setLoadingAuth(false));
				})
				.catch((err) => console.log(err.response))
				.finally(() => setLoadingAuth(false));
		}
	}, [router.query.code]);
	return (
		<>
			{loadingAuth && <LoadingOverlay />}
			<button className={styles.button}>
				<a href="https://github.com/login/oauth/authorize?scope=repo,user:email&client_id=4710f43b56ca1572e2a8">
					<FaGithub /> Continue with GitHub
				</a>
			</button>
		</>
	);
};

export default GithubAuth;
