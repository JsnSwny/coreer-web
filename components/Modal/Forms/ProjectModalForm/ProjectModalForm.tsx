import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import { Project, ProjectRequest } from "@/interfaces/project.model";
import DateRangeInput from "../../Inputs/DateRangeInput/DateRangeInput";
import { format, parseISO } from "date-fns";
import { addProject, deleteProject, updateProject } from "@/api/projects";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Head from "next/head";
import "highlight.js/styles/monokai-sublime.css";
import hljs from "highlight.js";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "@/components/Forms/Error/FormError";
import Select from "react-select";
import { Skill } from "@/interfaces/language.model";
import axios from "axios";
import { useEffect } from "react";
import { server } from "@/config";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const quillModules = {
	toolbar: [
		[{ header: [2, 3, false] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[
			{ script: "sub" },
			{ script: "super" },
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link", "image"],
		["code-block"],
	],
	syntax: {
		highlight: (text: string) => hljs.highlightAuto(text).value,
	},
};
interface ModalFormProps {
	closeModal: () => void;
	item: Project | null;
}

const schema = yup.object().shape({
	// image: yup.mixed(),
	title: yup.string().required("Title is required"),
	description: yup.string(),
	start_date: yup.date(),
	end_date: yup.date(),
	project_link: yup.string(),
	repo_link: yup
		.string()
		.matches(
			/^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+$/,
			"Invalid GitHub repo URL"
		),
	languages: yup.array(),
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
	} = useForm({
		mode: "onTouched",
		resolver: yupResolver(schema),
	});
	const { user, setUser } = useAuth();
	const [image, setImage] = useState<File | null>(null);

	interface Option {
		value: string;
		label: string;
		group: "L" | "F" | "O";
	}

	const [options, setOptions] = useState<Option[]>([]);
	const [selectedOptions, setSelectedOptions] = useState([]);

	useEffect(() => {
		axios
			.get(`${server}/most-popular-languages/`)
			.then((res) => {
				setOptions(
					res.data.languages.map((item: Skill) => ({
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
		languages?: number[];
	}) => {
		let obj: ProjectRequest = {
			title: data.title,
			description: data.description,
			image,
			start_date: data.start_date
				? format(data.start_date, "yyyy-MM-dd")
				: data.start_date,
			end_date: data.end_date
				? format(data.end_date, "yyyy-MM-dd")
				: data.end_date,
			user_id: user!.id,
			project_link: data.project_link,
			repo_link:
				data.repo_link && !/^https?:\/\//i.test(data.repo_link)
					? `https://${data.repo_link}` // Prepend 'https://' if URL does not have a protocol
					: data.repo_link,
			languages_id: data.languages ? data.languages : [],
		};

		console.log(obj);

		if (item) {
			// Update existing project
			const updatedProject = await updateProject(item.id, obj);
			setUser({
				...user!,
				projects: user!.projects.map((project) =>
					project.id === updatedProject.id ? updatedProject : project
				),
			});
		} else {
			// Add new project
			const newProject = await addProject(obj);
			setUser({ ...user!, projects: [...user!.projects, newProject] });
		}

		closeModal();
	};

	const photoUpload = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const maxSize = 5 * 1024 * 1024;

		if (file.size <= maxSize) {
			reader.onloadend = () => {
				setImage(file);
			};
			reader.readAsDataURL(file);
			// Clear the image error if it was previously set
			setValue("image", file); // Assuming you are using the 'react-hook-form' `setValue` method
			return file;
		} else {
			// Set the image error when the file size exceeds the limit
			setValue("image", ""); // Assuming you are using the 'react-hook-form' `setValue` method
			setError("image", {
				type: "maxSize",
				message: "File size exceeds the maximum limit",
			});
			return;
		}
	};

	const handleDelete = async () => {
		deleteProject(item!.id);
		setUser({
			...user!,
			projects: [...user!.projects.filter((project) => project.id != item!.id)],
		});
		closeModal();
	};

	// const quillFormats = ["header", "bold", "italic", "underline", "code-block"];

	// const options: Option[] = careerLevels.map((item) => ({
	// 	value: String(item.id),
	// 	label: item.name,
	// 	group: item.category,
	// }));

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

	console.log(groupedOptions);

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
					<Controller
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
					></Controller>
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
					<input type="file" onChange={photoUpload} />
					{/* <FormError message={errors.image?.message} /> */}
				</div>
				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Video</label>
					<input type="file" onChange={photoUpload} />
					{/* <FormError message={errors.image?.message} /> */}
				</div>
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
