import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";

const AddProjectModalForm = ({ closeModal }) => {
  const { user, updateUser, addProject } = useAuth();
  const [image, setImage] = useState("");
  const [staticSrc, setStaticSrc] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    // onSave(inputValue);
    addProject({
      title,
      description,
      image,
      start_date: "2023-05-29",
      user: user.id,
    });
    setTitle("");
    setDescription("");
    closeModal();
  };

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      <div className={globalStyles.modalBody}>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Image</label>
          <input
            autoFocus
            // className={globalStyles.input}
            type="file"
            onChange={photoUpload}
          />
        </div>

        {/* <label className={globalStyles.label}>Video</label>
        <input
          autoFocus
          // className={globalStyles.input}
          type="file"
          onChange={photoUpload}
        /> */}

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
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

export default AddProjectModalForm;
