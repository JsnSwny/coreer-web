import globalStyles from "@/styles/globalStyles.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button/Button";
import LocationSearchInput from "@/components/Forms/Inputs/LocationSearchInput/LocationSearchInput";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "@/components/Forms/Error/FormError";
import { useEffect, useState } from "react";
import Select from "react-select";
import { CareerLevel } from "@/interfaces/profile.model";
import { server } from "@/config";
import axios from "axios";

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
	current_level: yup.string().required("Current level is required"),
	looking_for: yup
		.array()
		.min(1, "Looking for must have at least 1 selected")
		.required(),
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
		current_level: string;
		looking_for: string[];
	}) => {
		updateUser({
			location: data.location,
			first_name: data.first_name,
			last_name: data.last_name,
			username: data.username,
			bio: data.bio,
			current_level_id: parseInt(data.current_level),
			looking_for_id: data.looking_for.map((item) => parseInt(item)),
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
			current_level: String(user!.current_level.id),
			looking_for: user!.looking_for.map((item) => String(item.id)),
		});
	}, [reset]);

	interface Option {
		value: string;
		label: string;
		group: "S" | "P" | "R";
	}

	const [careerOptions, setCareerOptions] = useState<Option[]>([]);

	useEffect(() => {
		axios.get<CareerLevel[]>(`${server}/api/career-levels/`).then((res) =>
			setCareerOptions(
				res.data.map((item) => ({
					value: String(item.id),
					label: item.name,
					group: item.level_type,
				}))
			)
		);
	}, []);

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
					<input {...register("username")} className={globalStyles.input} />
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
				<div className={globalStyles.formTwoColumn}>
					<div className={globalStyles.formGroup}>
						<label htmlFor="career_level" className={globalStyles.label}>
							Career Level*
						</label>
						<Controller
							control={control}
							name="current_level"
							render={({ field }) => (
								<Select
									options={careerOptions}
									onChange={(val) => {
										field.onChange(val?.value);
									}}
									value={
										field.value
											? careerOptions.filter((item) =>
													field.value.includes(item.value)
											  )
											: null
									}
								/>
							)}
						/>

						<FormError message={errors.current_level?.message} />
					</div>
					<div className={globalStyles.formGroup}>
						<label htmlFor="looking_for" className={globalStyles.label}>
							Looking for*
						</label>
						<Controller
							control={control}
							name="looking_for"
							render={({ field }) => (
								<Select
									options={careerOptions}
									onChange={(val) => field.onChange(val.map((c) => c.value))}
									isMulti
									value={
										field.value &&
										careerOptions.filter((c) => field.value.includes(c.value))
									}
								/>
							)}
						/>

						<FormError message={errors.looking_for?.message} />
					</div>
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
