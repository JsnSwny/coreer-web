import styles from "./ResetPasswordForm.module.scss";
import axios, { AxiosResponse } from "axios";
import { server } from "@/config";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import globalStyles from "@/styles/globalStyles.module.scss";
import Button from "@/components/Button/Button/Button";
import Link from "next/link";
import LoadingOverlay from "@/components/Layout/LoadingOverlay/LoadingOverlay";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormError from "../../Error/FormError";
import { toast } from "react-toastify";

const schema = yup.object().shape({
	email: yup.string().email().required("Email is required"),
});

const ResetPasswordForm = () => {
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

	const onSubmitHandler = async (data: { email: string }) => {
		setLoading(true);
		try {
			axios
				.post(`${server}/api/auth/password/reset/`, { email: data.email })
				.then((res) => console.log(res.data));
			reset();
			toast.success("Password reset email has been sent");
		} catch {
			toast.error("Error");
		}

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
				<Button loading={loading} text="Reset" />
			</form>
		</>
	);
};

export default ResetPasswordForm;
