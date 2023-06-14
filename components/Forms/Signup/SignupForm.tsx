import styles from "./SignupForm.module.scss";
import axios from "axios";
import { server } from "@/config";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import globalStyles from "@/styles/globalStyles.module.scss";
import Button from "@/components/Button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormError from "../Error/FormError";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  passwordConfirm: yup
    .string()
    .required("Confirm Password is required")
    .min(8, "Password length should be at least 8 characters")
    .max(32, "Password cannot exceed more than 32 characters")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const SignupForm = () => {
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: {
    email: string;
    password: string;
    passwordConfirm: string;
  }) => {
    await signUp(email, password, passwordConfirm);
    reset();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
        <div className={globalStyles.formGroup}>
          <label
            htmlFor="email"
            className={`${globalStyles.label} ${styles.label}`}
          >
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            name="email"
            className={`${globalStyles.input} ${styles.input}`}
          />
          <FormError message={errors.email?.message} />
        </div>

        <div className={globalStyles.formGroup}>
          <label
            htmlFor="password"
            className={`${globalStyles.label} ${styles.label}`}
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            name="password"
            className={`${globalStyles.input} ${styles.input}`}
          />
          <FormError message={errors.password?.message} />
        </div>

        <div className={globalStyles.formGroup}>
          <label
            htmlFor="password"
            className={`${globalStyles.label} ${styles.label}`}
          >
            Confirm Password
          </label>
          <input
            {...register("passwordConfirm")}
            type="password"
            name="password"
            className={`${globalStyles.input} ${styles.input}`}
          />
          <FormError message={errors.passwordConfirm?.message} />
        </div>
        <Button text="Sign up" size="large" />
      </form>
      <p className={styles.altLink}>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </>
  );
};

export default SignupForm;
