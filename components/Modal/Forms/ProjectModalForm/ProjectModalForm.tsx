import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import { Project, ProjectRequest } from "@/interfaces/project.model";
import DateRangeInput from "../../Inputs/DateRangeInput/DateRangeInput";
import { format, parseISO } from "date-fns";
import { addProject, deleteProject, updateProject } from "@/api/projects";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "@/components/Forms/Error/FormError";
import Select from "react-select";
import { Skill } from "@/interfaces/language.model";
import axios from "axios";
import { useEffect } from "react";
import { server } from "@/config";
import GalleryInput from "../../Inputs/GalleryInput/GalleryInput";
import { ProjectImage } from "@/interfaces/project.model";
import DescriptionInput from "../../Inputs/DescriptionInput/DescriptionInput";

interface ModalFormProps {
	closeModal: () => void;
	item: Project | null;
}

const schema = yup.object().shape({
	image: yup.mixed(),
	video: yup.mixed(),
	title: yup.string().required("Title is required"),
	description: yup.string().required("Description is required"),
	start_date: yup.date(),
	end_date: yup.date(),
	project_link: yup.string(),
	repo_link: yup
		.string()
		.matches(
			/^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+$/,
			{ message: "Invalid GitHub Repo URL", excludeEmptyString: true }
		),
	languages: yup
		.array()
		.min(1, "At least one skill is required")
		.required("At least one skill is required"),
});

const ProjectModalForm = ({ closeModal, item }: ModalFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
		getValues,
		watch,
		clearErrors,
		setError,
		setValue,
	} = useForm({
		mode: "onTouched",
		resolver: yupResolver(schema),
	});
	const { user, setUser } = useAuth();

	interface Option {
		value: string;
		label: string;
		group: "L" | "F" | "O";
	}

	const [options, setOptions] = useState<Option[]>([]);
	const [galleryImages, setGalleryImages] = useState<ProjectImage[]>([]);

	useEffect(() => {
		axios
			.get(`${server}/api/languages/`)
			.then((res) => {
				setOptions(
					res.data.map((item: Skill) => ({
						value: item.id,
						label: item.name,
						group: item.category,
					}))
				);
			})
			.catch((err) => {
				console.log("error");
				console.log(err.response);
			});
	}, []);

	const onSubmitHandler = async (data: {
		title: string;
		description?: string;
		image?: File | null;
		start_date?: Date;
		end_date?: Date;
		project_link?: string;
		repo_link?: string;
		video?: File | null;
		languages?: number[];
	}) => {
		let obj: ProjectRequest = {
			title: data.title,
			description: data.description,
			image: data.image,
			video: data.video,
			start_date: data.start_date
				? format(data.start_date, "yyyy-MM-dd")
				: data.start_date,
			end_date: data.end_date
				? format(data.end_date, "yyyy-MM-dd")
				: data.end_date,
			user_id: user!.id,
			project_link:
				data.project_link && !/^https?:\/\//i.test(data.project_link)
					? `https://${data.project_link}` // Prepend 'https://' if URL does not have a protocol
					: data.repo_link,
			repo_link:
				data.repo_link && !/^https?:\/\//i.test(data.repo_link)
					? `https://${data.repo_link}` // Prepend 'https://' if URL does not have a protocol
					: data.repo_link,
			languages_id: data.languages ? data.languages : [],
		};

		if (item) {
			// Update existing project
			const updatedProject = await updateProject(item.id, obj);

			const requests = galleryImages.map((image) =>
				axios.put(`${server}/api/project-images/${image.id}/`, {
					project: updatedProject.id,
				})
			);
			const response = await Promise.all(requests);

			updatedProject.images = response.map((item) => item.data.image);

			setUser({
				...user!,
				projects: user!.projects.map((project) =>
					project.id === updatedProject.id ? updatedProject : project
				),
			});
		} else {
			// Add new project
			const newProject = await addProject(obj);
			const requests = galleryImages.map((image) =>
				axios.put(`${server}/api/project-images/${image.id}/`, {
					project: newProject.id,
				})
			);

			const response = await Promise.all(requests);

			newProject.images = response.map((item) => item.data.image);

			setUser({ ...user!, projects: [...user!.projects, newProject] });
		}

		closeModal();
	};

	const handleDelete = async () => {
		deleteProject(item!.id);
		setUser({
			...user!,
			projects: [...user!.projects.filter((project) => project.id != item!.id)],
		});
		closeModal();
	};

	const groupedOptions = [
		{
			label: "Languages",
			options: options.filter((option) => option.group === "L"),
		},
		{
			label: "Framework",
			options: options.filter((option) => option.group === "F"),
		},
		{
			label: "Other",
			options: options.filter((option) => option.group === "O"),
		},
	];

	useEffect(() => {
		if (item) {
			reset({
				title: item.title,
				image: item.image
					? typeof item.image != "string"
						? item.image
						: undefined
					: undefined,
				video: item.video
					? typeof item.video != "string"
						? item.video
						: undefined
					: undefined,
				start_date: item.start_date ? parseISO(item.start_date) : undefined,
				end_date: item.end_date ? parseISO(item.end_date) : undefined,
				description: item.description,
				project_link: item.project_link ? item.project_link : undefined,
				repo_link: item.repo_link ? item.repo_link : undefined,
				languages: item.languages && item.languages.map((item) => item.id),
			});

			axios
				.get(`${server}/api/project-images/?project__id=${item.id}`)
				.then((res) => setGalleryImages(res.data));
		}
	}, [reset]);

	return (
		<form onSubmit={handleSubmit(onSubmitHandler)}>
			<div className={globalStyles.modalBody}>
				<div className={globalStyles.modalSection}>
					<span>1</span>
					<p>Information</p>
				</div>

				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Title*</label>
					<input
						autoFocus
						className={globalStyles.input}
						type="text"
						{...register("title")}
					/>
					<FormError message={errors.title?.message} />
				</div>
				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Description</label>
					<DescriptionInput control={control} />
					{/* <Controller
						control={control}
						name="description"
						render={({ field }) => (
							<ReactQuill
								value={field.value}
								onChange={(value) => field.onChange(value)}
								modules={quillModules}
								theme="snow"
							/>
						)}
					></Controller> */}
					<FormError message={errors.description?.message} />
				</div>
				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Skills</label>
					<Controller
						control={control}
						name="languages"
						render={({ field }) => (
							<Select
								options={groupedOptions}
								onChange={(val) => field.onChange(val.map((c) => c.value))}
								isMulti
								value={
									field.value &&
									options.filter(
										(c) => field.value && field.value.includes(c.value)
									)
								}
							/>
						)}
					/>
					<FormError message={errors.languages?.message} />
				</div>

				<DateRangeInput
					control={control}
					errors={errors}
					watch={watch}
					startDateRequired={false}
				/>

				<hr className={globalStyles.modalDivider} />

				<div className={globalStyles.modalSection}>
					<span>2</span>
					<p>Images & Videos</p>
				</div>

				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Thumbnail</label>
					<Controller
						control={control}
						name="image"
						render={({ field }) => (
							<input
								type="file"
								accept="image/*"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) {
										field.onChange(file);
										if (file.size > 10 * 1024 * 1024) {
											setError("image", {
												type: "maxSize",
												message: "File size exceeds the maximum limit of 10MB.",
											});
											setValue("image", null);
										} else {
											clearErrors("image");
										}
									}
								}}
							/>
						)}
					/>
					<FormError message={errors.image?.message as string} />
				</div>
				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Video</label>
					<Controller
						control={control}
						name="video"
						render={({ field }) => (
							<input
								type="file"
								accept="video/mp4,video/x-m4v,video/*"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) {
										field.onChange(file);
										if (file.size > 20 * 1024 * 1024) {
											setError("video", {
												type: "maxSize",
												message: "File size exceeds the maximum limit of 20MB.",
											});
											setValue("video", null);
										} else {
											clearErrors("video");
										}
									}
								}}
							/>
						)}
					/>
					<FormError message={errors.video?.message as string} />
				</div>

				<GalleryInput
					galleryImages={galleryImages}
					setGalleryImages={setGalleryImages}
				/>

				<hr className={globalStyles.modalDivider} />

				<div className={globalStyles.modalSection}>
					<span>3</span>
					<p>Links</p>
				</div>

				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Repository URL</label>
					<input
						className={globalStyles.input}
						type="text"
						{...register("repo_link")}
					/>
					<FormError message={errors.repo_link?.message} />
				</div>
				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Project URL</label>
					<input
						className={globalStyles.input}
						type="text"
						{...register("project_link")}
					/>
					<FormError message={errors.project_link?.message} />
				</div>
			</div>
			<div className={globalStyles.modalFooter}>
				{item && (
					<Button
						submit={false}
						text="Delete"
						color="red"
						onClick={handleDelete}
					/>
				)}
				<div className={globalStyles.modalFooterRight}>
					<Button text="Save" />
				</div>
			</div>
		</form>
	);
};

export default ProjectModalForm;
