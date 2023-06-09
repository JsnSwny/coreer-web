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

const ProjectModalForm = ({ closeModal, item }: ModalFormProps) => {
  console.log(item);
  const { user, setUser } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState(item ? item.title : "");
  const [description, setDescription] = useState(
    item?.description ? item.description : ""
  );
  const [startDate, setStartDate] = useState<Date | null>(
    item?.start_date ? parseISO(item.start_date) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    item?.end_date ? parseISO(item.end_date) : null
  );
  const [editorContent, setEditorContent] = useState(
    item?.content ? item.content : ""
  );

  const handleSave = async () => {
    if (title) {
      let obj: ProjectRequest = {
        title,
        description,
        image,
        start_date: startDate ? format(startDate, "yyyy-MM-dd") : startDate,
        end_date: endDate ? format(endDate, "yyyy-MM-dd") : endDate,
        user: user!.id,
        content: editorContent ? editorContent : "",
      };
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

      setTitle("");
      setDescription("");
      setStartDate(null);
      setEndDate(null);
      setImage(null);
      setEditorContent("");

      closeModal();
    }
  };

  const photoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files?.[0] as File | undefined;

    if (file) {
      reader.onloadend = () => {
        setImage(file);
      };
      reader.readAsDataURL(file);
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
    <>
      <div className={globalStyles.modalBody}>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Image</label>
          <input autoFocus type="file" onChange={photoUpload} />
        </div>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Title*</label>
          <input
            autoFocus
            className={globalStyles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <DateRangeInput
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Description</label>
          <textarea
            className={globalStyles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          ></textarea>
        </div>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Content</label>
          <ReactQuill
            value={editorContent}
            onChange={setEditorContent}
            modules={quillModules}
            theme="snow"
            style={{ height: `${12 * 24}px` }}
          />
        </div>
      </div>
      <div className={globalStyles.modalFooter}>
        {item && <Button text="Delete" color="red" onClick={handleDelete} />}
        <div className={globalStyles.modalFooterRight}>
          <Button text="Save" onClick={handleSave} />
        </div>
      </div>
    </>
  );
};

export default ProjectModalForm;
