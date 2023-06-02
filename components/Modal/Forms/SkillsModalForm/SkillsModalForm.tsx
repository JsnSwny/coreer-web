import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import AsyncSelect from "react-select/async";
import { server } from "@/config";
import axios from "axios";
import { School } from "@/interfaces/education.model";
import TagsList from "@/components/Tags/TagsList/TagsList";
import TagSelector from "@/components/Auth/Onboarding/TagSelector/TagSelector/TagSelector";
import { useEffect } from "react";
import TagSelectorList from "@/components/Auth/Onboarding/TagSelector/TagSelectorList/TagSelectorList";
import { Skill } from "@/interfaces/language.model";

interface ModalFormProps {
  closeModal: () => void;
}

const SkillsModalForm = ({ closeModal }: ModalFormProps) => {
  const { user, updateUser } = useAuth();

  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(
    user ? user.languages : []
  );

  useEffect(() => {
    axios
      .get(`${server}/most-popular-languages/`)
      .then((res) => {
        setOptions(res.data.languages);
      })
      .catch((err) => {
        console.log("error");
        console.log(err.response);
      });
  }, []);

  const handleSave = () => {
    updateUser({
      languages_id: selectedOptions.map((item) => item.id),
    });
    closeModal();
  };

  return (
    <>
      <div className={globalStyles.modalBody}>
        <TagSelectorList>
          {options.map((option: Skill) => (
            <TagSelector
              title={option.name}
              active={selectedOptions.some((item) => item.id == option.id)}
              setSelectedOptions={setSelectedOptions}
              selectedOptions={selectedOptions}
              option={option}
            />
          ))}
        </TagSelectorList>
      </div>
      <div className={globalStyles.modalFooter}>
        <Button text="Save" onClick={handleSave} />
      </div>
    </>
  );
};

export default SkillsModalForm;
