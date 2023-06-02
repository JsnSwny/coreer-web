import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import { WorkExperienceRequest } from "@/interfaces/work_experiences.model";
import DateRangeInput from "../../Inputs/DateRangeInput/DateRangeInput";

interface ModalFormProps {
  closeModal: () => void;
}

const WorkModalForm = ({ closeModal }: ModalFormProps) => {
  const { user, addWorkExperience } = useAuth();

  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSave = () => {
    let obj: WorkExperienceRequest = {
      user: user!.id,
      job_title: jobTitle,
      company,
      location,
      start_date: "2023-05-29",
      description,
    };
    addWorkExperience(obj);
    closeModal();
  };

  return (
    <>
      <div className={globalStyles.modalBody}>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Company*</label>
          <input
            autoFocus
            className={globalStyles.input}
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Job Title*</label>
          <input
            className={globalStyles.input}
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Location*</label>
          <input
            className={globalStyles.input}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
      </div>
      <div className={globalStyles.modalFooter}>
        <Button text="Save" onClick={handleSave} />
      </div>
    </>
  );
};

export default WorkModalForm;
