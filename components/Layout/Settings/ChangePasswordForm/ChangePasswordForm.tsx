import styles from "./ChangePasswordForm.module.scss";
import globalStyles from "@/styles/globalStyles.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "@/components/Button/Button/Button";
import axios from "axios";
import { server } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import FormError from "@/components/Forms/Error/FormError";

const schema = yup.object().shape({
	current_password: yup
		.string()
		.required("Password is required")
		.min(8, "Password length must be at least 8 characters")
		.max(32, "Password cannot exceed more than 32 characters"),
	new_password: yup
		.string()
		.required("Password is required")
		.min(8, "Password length must be at least 8 characters")
		.max(32, "Password cannot exceed more than 32 characters"),
	c_new_password: yup
		.string()
		.oneOf([yup.ref("new_password")], "Passwords do not match")
		.min(8, "Password length must be at least 8 characters")
		.max(32, "Password cannot exceed more than 32 characters")
		.required(),
});

interface ChangePasswordFormProps {
	userId?: string;
	token?: string;
}

const ChangePasswordForm = ({ userId, token }: ChangePasswordFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [loading, setLoading] = useState(false);

	const { user, userToken } = useAuth();

	const onSubmitHandler = async (data: {
		current_password: string;
		new_password: string;
		c_new_password: string;
	}) => {
		setLoading(true);
		// await signUp(data.email, data.password, data.cpassword);
		if (!userId) {
			axios
				.post(
					`${server}/api/auth/password/change/`,
					{
						old_password: data.current_password,
						new_password1: data.new_password,
						new_password2: data.c_new_password,
					},
					{ headers: { Authorization: `Token ${userToken}` } }
				)
				.then((res) => {
					reset();
					toast.success("Password successfully reset!");
				})
				.catch((err) => {
					console.log(err.response);
				});

			setLoading(false);
		} else {
			console.log({
				uid: userId,
				token: token,
				new_password1: data.new_password,
				new_password2: data.c_new_password,
			});
			axios
				.post(`${server}/api/auth/password/reset/confirm/`, {
					uid: userId,
					token: token,
					new_password1: data.new_password,
					new_password2: data.c_new_password,
				})
				.then((res) => {
					reset();
					toast.success("Password successfully reset!");
				})
				.catch((err) => {
					console.log(err.response);
				});

			setLoading(false);
		}
	};

	return (
		<>
			<h2 className={styles.title}>Privacy</h2>
			<form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Current password</label>
					<input
						className={`${globalStyles.input} ${styles.input}`}
						{...register("current_password")}
						type="password"
					/>
				</div>
				<div className={`${globalStyles.formGroup}`}>
					<label className={globalStyles.label}>New password</label>
					<input
						className={`${globalStyles.input} ${styles.input}`}
						{...register("new_password")}
						type="password"
					/>
					<FormError message={errors.new_password?.message} />
				</div>
				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Confirm new password</label>
					<input
						className={`${globalStyles.input} ${styles.input}`}
						{...register("c_new_password")}
						type="password"
					/>
					<FormError message={errors.c_new_password?.message} />
				</div>
				<Button loading={loading} text="Save" />
			</form>
		</>
	);
};

export default ChangePasswordForm;
