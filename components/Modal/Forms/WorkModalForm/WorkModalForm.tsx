import { addExperience, deleteExperience, updateExperience } from "@/api/experiences";
import Button from "@/components/Button/Button";
import FormError from "@/components/Forms/Error/FormError";
import LocationSearchInput from "@/components/Forms/Inputs/LocationSearchInput";
import { useAuth } from "@/contexts/AuthContext";
import { WorkExperience, WorkExperienceRequest } from "@/interfaces/work_experiences.model";
import globalStyles from "@/styles/globalStyles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { format, parseISO } from "date-fns";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import DateRangeInput from "../../Inputs/DateRangeInput/DateRangeInput";

interface ModalFormProps {
  closeModal: () => void;
  item: WorkExperience | null;
}

const schema = yup.object().shape({
  job_title: yup.string().required("Job Title is required"),
  company: yup.string().required("Company is required"),
  location: yup.string().required("Location is required"),
  description: yup.string(),
  start_date: yup.date().required("Start Date is required"),
  end_date: yup.date(),
});

const WorkModalForm = ({ closeModal, item }: ModalFormProps) => {
  const { user, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: {
    job_title: string;
    company: string;
    location: string;
    start_date: Date;
    end_date?: Date;
    description?: string;
  }) => {
    let obj: WorkExperienceRequest = {
      company: data.company,
      job_title: data.job_title,
      location: data.location,
      start_date: format(data.start_date, "yyyy-MM-dd"),
      end_date: data.end_date ? format(data.end_date, "yyyy-MM-dd") : null,
      description: data.description,
      user: user!.id,
    };

    let updatedUser = null;

    if (item) {
      // Update existing experience
      const updatedExperience = await updateExperience(item.id, obj);
      updatedUser = {
        ...user!,
        work_experiences: user!.work_experiences.map((experience) =>
          experience.id === updatedExperience.id ? updatedExperience : experience,
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
  };

  useEffect(() => {
    if (item) {
      reset({
        job_title: item.job_title,
        company: item.company,
        location: item.location,
        start_date: parseISO(item.start_date),
        end_date: item.end_date ? parseISO(item.end_date) : undefined,
        description: item.description,
      });
    }
  }, [reset]);

  const handleDelete = async () => {
    deleteExperience(item!.id);
    setUser({
      ...user!,
      work_experiences: [
        ...user!.work_experiences.filter((experience) => experience.id != item!.id),
      ],
    });
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={globalStyles.modalBody}>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Company*</label>
          <input autoFocus className={globalStyles.input} type="text" {...register("company")} />
          <FormError message={errors.company?.message} />
        </div>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Job Title*</label>
          <input className={globalStyles.input} type="text" {...register("job_title")} />
          <FormError message={errors.job_title?.message} />
        </div>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Location*</label>
          <Controller
            control={control}
            name="location"
            render={({ field }) => <LocationSearchInput control={control} errors={errors} />}
          ></Controller>
          <FormError message={errors.location?.message} />
        </div>
        <DateRangeInput control={control} errors={errors} watch={watch} />
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Description</label>
          <textarea className={globalStyles.input} rows={4} {...register("description")}></textarea>
          <FormError message={errors.description?.message} />
        </div>
      </div>
      <div className={`${globalStyles.modalFooter}`}>
        {item && <Button submit={false} text="Delete" color="red" onClick={handleDelete} />}
        <div className={globalStyles.modalFooterRight}>
          <Button text="Save" />
        </div>
      </div>
    </form>
  );
};

export default WorkModalForm;
