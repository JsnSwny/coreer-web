import styles from "./LoginForm.module.scss";
import axios, { AxiosResponse } from "axios";
import { server } from "@/config";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import globalStyles from "@/styles/globalStyles.module.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";
import LoadingOverlay from "@/components/Layout/LoadingOverlay/LoadingOverlay";
import GithubAuth from "./GithubAuth/GithubAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormError from "../Error/FormError";

const schema = yup.object().shape({
	email: yup.string().email().required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Password length must be at least 8 characters")
		.max(32, "Password length cannot exceed more than 32 characters"),
});

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setError,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const { signIn } = useAuth();
	const [loading, setLoading] = useState(false);

	const onSubmitHandler = async (data: { email: string; password: string }) => {
		setLoading(true);
		const result = await signIn(data.email, data.password);
		reset();
		setLoading(false);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
				<div className={globalStyles.formGroup}>
					<label
						htmlFor="email"
						className={`${globalStyles.label} ${styles.label}`}
					>
						Email
					</label>
					<input
						{...register("email")}
						autoFocus
						type="email"
						name="email"
						className={`${globalStyles.input} ${styles.input}`}
					/>
					<FormError message={errors.email?.message} />
				</div>

				<div className={globalStyles.formGroup}>
					<label
						htmlFor="password"
						className={`${globalStyles.label} ${styles.label}`}
					>
						Password
					</label>

					<input
						{...register("password")}
						type="password"
						name="password"
						className={`${globalStyles.input} ${styles.input}`}
					/>
					<FormError message={errors.password?.message} />
				</div>
				<FormError message={errors.root?.message} margin />
				<Button loading={loading} text="Login" size="large" />
				<GithubAuth />
			</form>
			<p className={styles.altLink}>
				Dont have an account? <Link href="/signup">Sign up</Link>
			</p>
		</>
	);
};

export default LoginForm;
