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
	content: yup.string(),
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

	const onSubmitHandler = async (data: {
		title: string;
		description?: string;
		image?: File | null;
		start_date?: Date;
		end_date?: Date;
		content?: string;
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
			user: user!.id,
			content: data.content,
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
		console.log(e);
		const reader = new FileReader();
		const file = e.target.files?.[0] as File | undefined;

		if (file) {
			reader.onloadend = () => {
				setImage(file);
			};
			reader.readAsDataURL(file);
			return file;
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

	return (
		<form onSubmit={handleSubmit(onSubmitHandler)}>
			<div className={globalStyles.modalBody}>
				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Image</label>
					<input autoFocus type="file" onChange={photoUpload} />
					{/* <FormError message={errors.image?.message} /> */}
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
				<DateRangeInput control={control} errors={errors} watch={watch} />
				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Description</label>
					<textarea
						className={globalStyles.input}
						rows={4}
						{...register("description")}
					></textarea>
					<FormError message={errors.description?.message} />
				</div>
				<div className={globalStyles.formGroup}>
					<label className={globalStyles.label}>Content</label>
					<Controller
						control={control}
						name="content"
						render={({ field }) => (
							<ReactQuill
								value={field.value}
								onChange={(value) => field.onChange(value)}
								modules={quillModules}
								theme="snow"
								style={{ height: `${12 * 24}px` }}
							/>
						)}
					></Controller>
					<FormError message={errors.content?.message} />
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

export default ProjectModalForm;
