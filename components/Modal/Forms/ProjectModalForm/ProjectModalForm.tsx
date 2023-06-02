import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import { ProjectRequest } from "@/interfaces/project.model";

interface ModalFormProps {
  closeModal: () => void;
}

const ProjectModalForm = ({ closeModal }: ModalFormProps) => {
  const { user, addProject } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    let obj: ProjectRequest = {
      title,
      description,
      image,
      start_date: "2023-05-29",
      user: user!.id,
    };
    addProject(obj);
    setTitle("");
    setDescription("");
    closeModal();
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
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Description*</label>
          <textarea
            className={globalStyles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          ></textarea>
        </div>
      </div>
      <div className={globalStyles.modalFooter}>
        <Button text="Save" onClick={handleSave} />
      </div>
    </>
  );
};

export default ProjectModalForm;
