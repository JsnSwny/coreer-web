import globalStyles from "@/styles/globalStyles.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import LocationSearchInput from "@/components/Forms/Inputs/LocationSearchInput";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "@/components/Forms/Error/FormError";
import { useEffect } from "react";

interface ModalFormProps {
	closeModal: () => void;
}

const schema = yup.object().shape({
	first_name: yup
		.string()
		.max(32, "First name must be less than 32 characters")
		.required("First name is required"),
	last_name: yup
		.string()
		.max(32, "Last name must be less than 32 characters")
		.required("Last name is required"),
	location: yup.string().required("Location is required"),
	username: yup.string().required("Username is required"),
	bio: yup.string().max(500),
});

const DetailsModalForm = ({ closeModal }: ModalFormProps) => {
	const { user, updateUser } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm({
		mode: "onTouched",
		resolver: yupResolver(schema),
	});

	const onSubmitHandler = (data: {
		first_name: string;
		last_name: string;
		location: string;
		username: string;
		bio?: string;
	}) => {
		updateUser({
			location: data.location,
			first_name: data.first_name,
			last_name: data.last_name,
			username: data.username,
			bio: data.bio,
		});
		closeModal();
	};

	useEffect(() => {
		reset({
			first_name: user!.first_name,
			last_name: user!.last_name,
			location: user!.location,
			username: user!.username,
			bio: user!.bio,
		});
	}, [reset]);

	return (
		<form onSubmit={handleSubmit(onSubmitHandler)}>
			<div className={globalStyles.modalBody}>
				<div className={globalStyles.formTwoColumn}>
					<div className={globalStyles.formGroup}>
						<label className={globalStyles.label}>First Name</label>
						<input
							{...register("first_name")}
							autoFocus
							className={globalStyles.input}
						/>
						<FormError message={errors.first_name?.message} />
					</div>
					<div className={globalStyles.formGroup}>
						<label className={globalStyles.label}>Last Name</label>
						<input {...register("last_name")} className={globalStyles.input} />
						<FormError message={errors.last_name?.message} />
					</div>
				</div>

				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Username</label>
					<input
						{...register("username")}
						className={globalStyles.input}
						disabled
					/>
					<FormError message={errors.username?.message} />
				</div>

				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Location</label>
					<Controller
						control={control}
						name="location"
						render={({ field }) => (
							<LocationSearchInput control={control} errors={errors} />
						)}
					></Controller>
					<FormError message={errors.location?.message} />
				</div>
				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Bio</label>
					<textarea
						{...register("bio")}
						className={globalStyles.input}
						rows={4}
					></textarea>
					<FormError message={errors.bio?.message} />
				</div>
			</div>

			<div className={globalStyles.modalFooter}>
				<Button text="Save" />
			</div>
		</form>
	);
};

export default DetailsModalForm;
