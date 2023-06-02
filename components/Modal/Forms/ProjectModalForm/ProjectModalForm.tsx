import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import { ProjectRequest } from "@/interfaces/project.model";
import DateRangeInput from "../../Inputs/DateRangeInput/DateRangeInput";
import { format } from "date-fns";
import { addProject } from "@/api/projects";
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
    highlight: (text) => hljs.highlightAuto(text).value,
  },
};
interface ModalFormProps {
  closeModal: () => void;
}

const ProjectModalForm = ({ closeModal }: ModalFormProps) => {
  const { user, setUser } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [editorContent, setEditorContent] = useState("");

  const handleSave = async () => {
    if (title) {
      let obj: ProjectRequest = {
        title,
        description,
        image,
        start_date: startDate ? format(startDate, "yyyy-MM-dd") : startDate,
        end_date: endDate ? format(endDate, "yyyy-MM-dd") : endDate,
        user: user!.id,
        content: editorContent,
      };
      const newProject = await addProject(obj);
      setUser({ ...user!, projects: [...user!.projects, newProject] });
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
          <label className={globalStyles.label}>Description*</label>
          <textarea
            className={globalStyles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          ></textarea>
        </div>
        <ReactQuill
          value={editorContent}
          onChange={setEditorContent}
          modules={quillModules}
          theme="snow"
        />
      </div>
      <div className={globalStyles.modalFooter}>
        <Button text="Save" onClick={handleSave} />
      </div>
    </>
  );
};

export default ProjectModalForm;
