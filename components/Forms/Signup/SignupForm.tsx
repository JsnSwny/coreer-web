import styles from "./SignupForm.module.scss";
import axios from "axios";
import { server } from "@/config";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import globalStyles from "@/styles/globalStyles.module.scss";
import Button from "@/components/Button/Button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormError from "../Error/FormError";
import GithubAuth from "../Auth/GithubAuth/GithubAuth";

const schema = yup.object().shape({
	email: yup.string().email().required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Password length must be at least 8 characters")
		.max(32, "Password cannot exceed more than 32 characters"),
	cpassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords do not match")
		.min(8, "Password length must be at least 8 characters")
		.max(32, "Password cannot exceed more than 32 characters")
		.required(),
});

const SignupForm = () => {
	const { signUp } = useAuth();

	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmitHandler = async (data: {
		email: string;
		password: string;
		cpassword: string;
	}) => {
		setLoading(true);
		await signUp(data.email, data.password, data.cpassword);
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
						type="email"
						autoFocus
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
						className={`${globalStyles.input} ${styles.input}`}
					/>
					<FormError message={errors.password?.message} />
				</div>

				<div className={globalStyles.formGroup}>
					<label
						htmlFor="cpassword"
						className={`${globalStyles.label} ${styles.label}`}
					>
						Confirm Password
					</label>
					<input
						{...register("cpassword")}
						type="password"
						className={`${globalStyles.input} ${styles.input}`}
					/>
					<FormError message={errors.cpassword?.message} />
				</div>
				<Button loading={loading} text="Sign up" size="large" />
				<GithubAuth />
				<p className={styles.agreement}>
					By signing up you agree to the Coreer{" "}
					<a href="/privacy-policy.html">Privacy Policy</a>
				</p>
			</form>
			<p className={styles.altLink}>
				Already have an account? <Link href="/login">Log in</Link>
			</p>
		</>
	);
};

export default SignupForm;
