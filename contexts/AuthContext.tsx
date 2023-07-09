import React, { createContext, useState, useContext, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Profile } from "@/interfaces/profile.model";
import { server } from "@/config";
import cookie from "cookie";
import { getUserConfig } from "@/utils/getUserConfig";

interface AuthContextType {
	user: Profile | null;
	userToken: string | null;
	signIn: (email: string, password: string) => void;
	signOut: () => void;
	signUp: (email: string, password1: string, password2: string) => void;
	loading: boolean;
	tokenLoading: boolean;
	setUser: (profile: Profile | null) => void;
	updateProfilePicture: (id: number, key: string, file: File) => void;
	updateUser: (data: object) => void;
	fetchUser: (accessToken: string) => void;
	githubToken: string | null;
	setGithubToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	userToken: null,
	signIn: () => {},
	signOut: () => {},
	signUp: () => {},
	loading: false,
	tokenLoading: false,
	setUser: () => {},
	updateProfilePicture: () => {},
	updateUser: () => {},
	fetchUser: () => {},
	githubToken: null,
	setGithubToken: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<Profile | null>(null);
	const [userToken, setUserToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [tokenLoading, setTokenLoading] = useState(true);
	const [githubToken, setGithubToken] = useState<string | null>(null);

	const fetchUser = async (accessToken: string) => {
		try {
			const response = await axios.get(`${server}/api/auth/user/`, {
				headers: {
					Authorization: `Token ${accessToken}`,
				},
			});

			if (response.status === 200) {
				const userData = response.data;
				localStorage.setItem("token", accessToken);
				setUser(userData);
				setUserToken(accessToken);
				setTokenLoading(false);
				return userData;
			} else {
				setUser(null);
				setTokenLoading(false);
			}
		} catch (error) {
			setUser(null);
			setTokenLoading(false);
		}

		setTokenLoading(false);
	};

	const signIn = async (
		email: string,
		password: string
	): Promise<AxiosResponse<any, any> | undefined> => {
		try {
			const response = await axios.post(`${server}/api/auth/login/`, {
				email,
				password,
			});

			if (response.status === 200) {
				const { key } = response.data;
				localStorage.setItem("token", key);
				fetchUser(key);
			} else {
				setUser(null);
				setLoading(false);
				console.log(response);
				console.log("Returning response");
			}
			return response;
		} catch (error) {
			const axiosError = error as AxiosError;
			console.log(axiosError.response);
			setUser(null);
			setLoading(false);
			return axiosError.response;
		}
	};

	const signUp = async (
		email: string,
		password1: string,
		password2: string
	) => {
		try {
			await axios
				.post(`${server}/api/auth/registration/`, {
					email,
					password1,
					password2,
				})
				.then((res) => {
					console.log("Registered!");
					console.log(res.data);
					signIn(email, password1);
				});
		} catch (error: any) {
			console.error(error.response);
			return error.response.data;
		} finally {
			setLoading(false);
		}
	};

	const signOut = () => {
		const token = localStorage.getItem("token");
		console.log(`Signing out: ${token}`);
		if (token) {
			axios
				.post(`${server}/api/auth/logout/`, null, getUserConfig())
				.then((res) => {
					localStorage.removeItem("token");
					document.cookie = cookie.serialize("token", "", {
						maxAge: 0,
						path: "/",
					});
					setUser(null);
					setUserToken(null);
				})
				.catch((err) => console.log(err));
		}
	};

	const updateProfilePicture = async (id: number, key: string, file: File) => {
		console.log("Updating file");
		console.log(file);
		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Token ${key}`,
				},
			};

			const formData = new FormData();
			formData.append("image", file);

			console.log(user);
			await axios
				.patch(`${server}/api/auth/user/`, formData, config)
				.then((res) => {
					console.log(res.data);
					setUser(res.data);
				})
				.catch((err) => console.log(err.response));
		} catch (error: any) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const updateUser = async (data: object) => {
		console.log(data);
		setLoading(true);
		try {
			await axios
				.put(
					`${server}/api/auth/user/`,
					{ username: user!.username, email: user!.email, ...data },
					getUserConfig()
				)
				.then((res) => {
					console.log(res.data);
					setUser(res.data);
				})
				.catch((err) => console.log(err.response));
		} catch (error: any) {
			console.error(error.response);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const accessToken = localStorage.getItem("token");
		if (accessToken) {
			fetchUser(accessToken);
		} else setTokenLoading(false);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				loading,
				user,
				userToken,
				signIn,
				signOut,
				signUp,
				setUser,
				updateProfilePicture,
				updateUser,
				fetchUser,
				githubToken,
				setGithubToken,
				tokenLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
