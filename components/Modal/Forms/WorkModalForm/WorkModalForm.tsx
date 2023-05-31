import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import AsyncSelect from "react-select/async";
import { server } from "@/config";
import axios from "axios";
import { School } from "@/interfaces/education.model";

const WorkModalForm = ({ closeModal }) => {
  const { user, addWorkExperience } = useAuth();

  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [degree, setDegree] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    addWorkExperience({
      user: user?.id,
      job_title: jobTitle,
      company,
      location,
      start_date: "2023-05-29",
      description,
    });
    closeModal();
  };

  return (
    <>
      <div className={globalStyles.modalBody}>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Company*</label>
          <input
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
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Description</label>
          <textarea
            className={globalStyles.input}
            type="text"
            value={description}
            onChange={setDescription}
            rows="4"
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
