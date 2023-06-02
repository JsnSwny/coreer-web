import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { ChangeEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";

interface ModalFormProps {
  closeModal: () => void;
}

const AboutModalForm = ({ closeModal }: ModalFormProps) => {
  const { user, updateUser } = useAuth();
  const [inputValue, setInputValue] = useState(user?.bio);

  const handleInputChange = (e: ChangeEvent) => {
    setInputValue((e.target as HTMLInputElement).value);
  };

  const handleSave = () => {
    // onSave(inputValue);
    updateUser({ bio: inputValue });
    setInputValue("");
    closeModal();
  };

  return (
    <>
      <div className={globalStyles.modalBody}>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Bio</label>
          <textarea
            className={globalStyles.input}
            value={inputValue}
            onChange={handleInputChange}
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

export default AboutModalForm;
