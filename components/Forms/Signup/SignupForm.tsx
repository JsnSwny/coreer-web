import Button from "@/components/Button/Button";
import { useAuth } from "@/contexts/AuthContext";
import globalStyles from "@/styles/globalStyles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormError from "../Error/FormError";
import styles from "./SignupForm.module.scss";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  cpassword: yup
    .string()
    .required("Confirm Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const SignupForm = () => {
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: { email: string; password: string; cpassword: string }) => {
    await signUp(data.email, data.password, data.cpassword);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
        <div className={globalStyles.formGroup}>
          <label htmlFor="email" className={`${globalStyles.label} ${styles.label}`}>
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className={`${globalStyles.input} ${styles.input}`}
          />
          <FormError message={errors.email?.message} />
        </div>

        <div className={globalStyles.formGroup}>
          <label htmlFor="password" className={`${globalStyles.label} ${styles.label}`}>
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className={`${globalStyles.input} ${styles.input}`}
          />
          <FormError message={errors.password?.message} />
        </div>

        <div className={globalStyles.formGroup}>
          <label htmlFor="cpassword" className={`${globalStyles.label} ${styles.label}`}>
            Confirm Password
          </label>
          <input
            {...register("cpassword")}
            type="password"
            className={`${globalStyles.input} ${styles.input}`}
          />
          <FormError message={errors.cpassword?.message} />
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
