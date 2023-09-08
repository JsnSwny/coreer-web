import Button from "@/components/Button/Button/Button";
import { useAuth } from "@/contexts/AuthContext";
import globalStyles from "@/styles/globalStyles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormError from "../Error/FormError";
import GithubAuth from "./GithubAuth/GithubAuth";
import styles from "./LoginForm.module.scss";

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

				<div className={styles.absolute}>
					<div className={globalStyles.formGroup}>
						<div className={styles.password}>
							<label
								htmlFor="password"
								className={`${globalStyles.label} ${styles.label}`}
							>
								Password
							</label>
						</div>

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
					<Link className={styles.forgotPassword} href="/password_reset">
						Forgot password?
					</Link>
				</div>
			</form>
			<p className={styles.altLink}>
				Dont have an account? <Link href="/signup">Sign up</Link>
			</p>
		</>
	);
};

export default LoginForm;
