import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import { ProjectRequest } from "@/interfaces/project.model";
import DateRangeInput from "../../Inputs/DateRangeInput/DateRangeInput";
import { format } from "date-fns";

interface ModalFormProps {
  closeModal: () => void;
}

const ProjectModalForm = ({ closeModal }: ModalFormProps) => {
  const { user, addProject } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSave = () => {
    if(title) {
      let obj: ProjectRequest = {
        title,
        description,
        image,
        start_date: startDate ? format(startDate, "yyyy-MM-dd") : startDate,
        end_date: endDate ? format(endDate, "yyyy-MM-dd") : endDate,
        user: user!.id,
      };
      addProject(obj);
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
      </div>
      <div className={globalStyles.modalFooter}>
        <Button text="Save" onClick={handleSave} />
      </div>
    </>
  );
};

export default ProjectModalForm;
