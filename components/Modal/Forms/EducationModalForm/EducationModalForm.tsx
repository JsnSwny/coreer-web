import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import AsyncSelect from "react-select/async";
import { server } from "@/config";
import axios from "axios";
import { EducationRequest, School } from "@/interfaces/education.model";
import { ActionMeta } from "react-select";
import DateRangeInput from "../../Inputs/DateRangeInput/DateRangeInput";
import { format } from "date-fns";
import { addEducation } from "@/api/educations";

interface ModalFormProps {
  closeModal: () => void;
}

const EducationModalForm = ({ closeModal }: ModalFormProps) => {
  const { user, setUser } = useAuth();

  type SchoolSelect = {
    value: string;
    label: string;
  };

  const [school, setSchool] = useState<SchoolSelect | null>(null);
  const [degree, setDegree] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSave = async () => {
    if (school && degree && startDate) {
      let obj: EducationRequest = {
        school_id: parseInt(school.value),
        degree,
        start_date: format(startDate, "yyyy-MM-dd"),
        end_date: endDate ? format(endDate, "yyyy-MM-dd") : endDate,
        description,
        user: user!.id,
      };

      const newEducation = await addEducation(obj)
      setUser({ ...user!, educations: [...user!.educations, newEducation] });

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
            onChange={(option: SchoolSelect | null) => setSchool(option)}
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

export default EducationModalForm;
