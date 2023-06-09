import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import {
  WorkExperience,
  WorkExperienceRequest,
} from "@/interfaces/work_experiences.model";
import DateRangeInput from "../../Inputs/DateRangeInput/DateRangeInput";
import { format, parseISO } from "date-fns";
import {
  addExperience,
  deleteExperience,
  updateExperience,
} from "@/api/experiences";
import LocationSearchInput from "@/components/Forms/Inputs/LocationSearchInput";

interface ModalFormProps {
  closeModal: () => void;
  item: WorkExperience | null;
}

const WorkModalForm = ({ closeModal, item }: ModalFormProps) => {
  const { user, setUser } = useAuth();

  const [jobTitle, setJobTitle] = useState(item ? item.job_title : "");
  const [company, setCompany] = useState(item ? item.company : "");
  const [location, setLocation] = useState(item ? item.location : "");
  const [description, setDescription] = useState(item ? item.description : "");
  const [startDate, setStartDate] = useState<Date | null>(
    item ? parseISO(item.start_date) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    item ? (item.end_date ? parseISO(item.end_date) : null) : null
  );

  const handleSave = async () => {
    if (jobTitle && company && location && startDate) {
      let obj: WorkExperienceRequest = {
        user: user!.id,
        job_title: jobTitle,
        company,
        location,
        start_date: format(startDate, "yyyy-MM-dd"),
        end_date: endDate ? format(endDate, "yyyy-MM-dd") : endDate,
        description,
      };

      let updatedUser = null;

      if (item) {
        // Update existing experience
        const updatedExperience = await updateExperience(item.id, obj);
        updatedUser = {
          ...user!,
          work_experiences: user!.work_experiences.map((experience) =>
            experience.id === updatedExperience.id
              ? updatedExperience
              : experience
          ),
        };
      } else {
        // Add new experience
        const newExperience = await addExperience(obj);
        updatedUser = {
          ...user!,
          work_experiences: [...user!.work_experiences, newExperience],
        };
      }

      setUser(updatedUser);
      closeModal();
    }
  };

  const handleDelete = async () => {
    deleteExperience(item!.id);
    setUser({
      ...user!,
      work_experiences: [
        ...user!.work_experiences.filter(
          (experience) => experience.id != item!.id
        ),
      ],
    });
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
          <LocationSearchInput location={location} setLocation={setLocation} />
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
        {item && <Button text="Delete" color="red" onClick={handleDelete} />}
        <div className={globalStyles.modalFooterRight}>
          <Button text="Save" onClick={handleSave} />
        </div>
      </div>
    </>
  );
};

export default WorkModalForm;
