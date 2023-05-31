import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import AsyncSelect from "react-select/async";
import { server } from "@/config";
import axios from "axios";
import { School } from "@/interfaces/education.model";

const EducationModalForm = ({ closeModal }) => {
  const { user, updateUser, addEducation } = useAuth();

  const [school, setSchool] = useState<School | null>(null);
  const [degree, setDegree] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (school) {
      addEducation({
        school: school.value,
        degree,
        start_date: "2023-05-29",
        user: user.id,
      });
      setDegree("");
      setSchool("");
      closeModal();
    }
  };

  const loadSchoolOptions = async (inputValue: string) => {
    const options = await axios.get(
      `${server}/api/schools/?search=${inputValue}`
    );

    console.log(options);

    return options.data.results.map((item: School) => ({
      value: item.id,
      label: item.name,
      color: "red",
    }));
  };
  return (
    <>
      <div className={globalStyles.modalBody}>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>School</label>
          <AsyncSelect
            id="school"
            name="school"
            defaultOptions
            loadOptions={loadSchoolOptions}
            onChange={(e: any) => setSchool(e)}
            placeholder="Search for a school..."
            autoFocus
          />
        </div>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Degree*</label>
          <input
            className={globalStyles.input}
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
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

export default EducationModalForm;
