import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";

const AddProjectModalForm = ({ closeModal }) => {
  const { user, updateUser, addProject } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    // onSave(inputValue);
    addProject({ title, description, start_date: "2023-05-29", user: user.id });
    setTitle("");
    setDescription("");
    closeModal();
  };

  return (
    <>
      <div className={globalStyles.modalBody}>
        <label className={globalStyles.label}>Title*</label>
        <input
          autoFocus
          className={globalStyles.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className={globalStyles.label}>Description*</label>
        <textarea
          className={globalStyles.input}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        ></textarea>
      </div>
      <div className={globalStyles.modalFooter}>
        <Button text="Save" onClick={handleSave} />
      </div>
    </>
  );
};

export default AddProjectModalForm;
