import Button from "@/components/Button/Button";
import { useAuth } from "@/contexts/AuthContext";
import globalStyles from "@/styles/globalStyles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormError from "../Error/FormError";
import GithubAuth from "./GithubAuth/GithubAuth";
import styles from "./LoginForm.module.scss";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { signIn } = useAuth();

  const onSubmitHandler = async (data: { email: string; password: string }) => {
    const result = await signIn(data.email, data.password);
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
            autoFocus
            type="email"
            name="email"
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
            name="password"
            required
            className={`${globalStyles.input} ${styles.input}`}
          />
          <FormError message={errors.password?.message} />
        </div>
        <FormError message={errors.root?.message} margin />
        <Button text="Login" size="large" />
        <GithubAuth />
      </form>
      <p className={styles.altLink}>
        Dont have an account? <Link href="/signup">Sign up</Link>
      </p>
    </>
  );
};

export default LoginForm;
