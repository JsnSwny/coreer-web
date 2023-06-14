import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import AsyncSelect from "react-select/async";
import { server } from "@/config";
import axios from "axios";
import {
	Education,
	EducationRequest,
	School,
} from "@/interfaces/education.model";
import { ActionMeta } from "react-select";
import DateRangeInput from "../../Inputs/DateRangeInput/DateRangeInput";
import { format, parseISO } from "date-fns";
import {
	addEducation,
	deleteEducation,
	updateEducation,
} from "@/api/educations";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "@/components/Forms/Error/FormError";

interface ModalFormProps {
	closeModal: () => void;
	item: Education | null;
}

const schema = yup.object().shape({
	school: yup.number().required("School is required"),
	degree: yup.string().required("Degree is required"),
	description: yup.string(),
	start_date: yup.date().required("Start Date is required"),
	end_date: yup.date(),
});

const EducationModalForm = ({ closeModal, item }: ModalFormProps) => {
	const { user, setUser } = useAuth();

	type SchoolSelect = {
		value: number;
		label: string;
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
		getValues,
		watch,
	} = useForm({
		mode: "onTouched",
		resolver: yupResolver(schema),
	});

	const onSubmitHandler = async (data: {
		school: number;
		degree: string;
		start_date: Date;
		end_date?: Date;
		description?: string;
	}) => {
		let obj: EducationRequest = {
			school_id: data.school,
			degree: data.degree,
			start_date: format(data.start_date, "yyyy-MM-dd"),
			end_date: data.end_date ? format(data.end_date, "yyyy-MM-dd") : null,
			description: data.description,
			user: user!.id,
		};
		if (item) {
			// Update existing education
			const updatedEducation = await updateEducation(item.id, obj);
			setUser({
				...user!,
				educations: user!.educations.map((education) =>
					education.id === updatedEducation.id ? updatedEducation : education
				),
			});
		} else {
			// Add new education
			const newEducation = await addEducation(obj);
			setUser({ ...user!, educations: [...user!.educations, newEducation] });
		}
		closeModal();
	};

	useEffect(() => {
		if (item) {
			reset({
				school: item.school.id,
				degree: item.degree,
				start_date: parseISO(item.start_date),
				end_date: item.end_date ? parseISO(item.end_date) : undefined,
				description: item.description,
			});
		}
	}, [reset]);

	const handleDelete = async () => {
		deleteEducation(item!.id);
		setUser({
			...user!,
			educations: [
				...user!.educations.filter((education) => education.id != item!.id),
			],
		});
		closeModal();
	};

	const [schoolOptions, setSchoolOptions] = useState([]);

	const loadSchoolOptions = async (inputValue: string) => {
		const options = await axios.get(
			`${server}/api/schools/?search=${inputValue}`
		);

		const selectOptions = options.data.results.map((item: School) => ({
			value: item.id,
			label: item.name,
		}));
		setSchoolOptions(selectOptions);
		return selectOptions;
	};
	return (
		<form onSubmit={handleSubmit(onSubmitHandler)}>
			<div className={globalStyles.modalBody}>
				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>School</label>
					<Controller
						control={control}
						name="school"
						render={({ field }) => (
							<AsyncSelect
								id="school"
								name="school"
								value={schoolOptions.filter(
									(item: SchoolSelect) => item.value == field.value
								)}
								defaultOptions
								loadOptions={loadSchoolOptions}
								onChange={(option: SchoolSelect | null) => {
									return field.onChange(option?.value);
								}}
								placeholder="Search for a school..."
								autoFocus
							/>
						)}
					></Controller>
					<FormError message={errors.school?.message} />
				</div>
				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Degree*</label>
					<input
						className={globalStyles.input}
						type="text"
						{...register("degree")}
					/>
					<FormError message={errors.degree?.message} />
				</div>
				<DateRangeInput control={control} errors={errors} watch={watch} />
				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Description</label>
					<textarea
						className={globalStyles.input}
						{...register("description")}
						rows={4}
					></textarea>
					<FormError message={errors.description?.message} />
				</div>
			</div>
			<div className={globalStyles.modalFooter}>
				{item && <Button text="Delete" color="red" onClick={handleDelete} />}
				<div className={globalStyles.modalFooterRight}>
					<Button text="Save" />
				</div>
			</div>
		</form>
	);
};

export default EducationModalForm;
