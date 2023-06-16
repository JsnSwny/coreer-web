import FormError from "@/components/Forms/Error/FormError";
import LocationSearchInput from "@/components/Forms/Inputs/LocationSearchInput";
import { useAuth } from "@/contexts/AuthContext";
import globalStyles from "@/styles/globalStyles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Actions from "../Actions/Actions";
import styles from "./PersonalDetails.module.scss";

const schema = yup.object().shape({
  first_name: yup.string().max(32).required("First name is required"),
  last_name: yup.string().max(32).required("Last name is required"),
  location: yup.string().required("Location is required"),
});

const PersonalDetails = () => {
  const router = useRouter();
  const { user, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      first_name: user!.first_name,
      last_name: user!.last_name,
      location: user!.location,
    });
  }, [reset]);

  const onSubmitHandler = (data: { first_name: string; last_name: string; location: string }) => {
    updateUser({
      first_name: data.first_name,
      last_name: data.last_name,
      location: data.location,
    });
    router.push("/onboarding/about-you");
  };

  const [location, setLocation] = useState("");

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
      <div className={globalStyles.formGroup}>
        <div className={styles.inputWrapper}>
          <div style={{ flex: 1 }}>
            <label htmlFor="first_name" className={globalStyles.label}>
              First name
            </label>
            <input
              type="text"
              {...register("first_name")}
              autoFocus
              className={globalStyles.input}
            />
            <FormError message={errors.first_name?.message} />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="last_name" className={globalStyles.label}>
              Last name
            </label>
            <input type="text" {...register("last_name")} className={globalStyles.input} />
            <FormError message={errors.last_name?.message} />
          </div>
        </div>
      </div>
      <div className={globalStyles.formGroup}>
        <label htmlFor="location" className={globalStyles.label}>
          Location
        </label>
        <Controller
          control={control}
          name="location"
          render={({ field }) => <LocationSearchInput control={control} errors={errors} />}
        ></Controller>

        <FormError message={errors.location?.message} />
      </div>

      <Actions />
    </form>
  );
};

export default PersonalDetails;
