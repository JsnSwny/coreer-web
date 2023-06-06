import styles from "./SignupForm.module.scss";
import axios from "axios";
import { server } from "@/config";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import globalStyles from "@/styles/globalStyles.module.scss";
import Button from "@/components/Button/Button";

const SignupForm = () => {
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signUp(email, password, passwordConfirm);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label
          htmlFor="email"
          className={`${globalStyles.label} ${styles.label}`}
        >
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`${globalStyles.input} ${styles.input}`}
          />
        </label>

        <label
          htmlFor="password"
          className={`${globalStyles.label} ${styles.label}`}
        >
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`${globalStyles.input} ${styles.input}`}
          />
        </label>

        <label
          htmlFor="password"
          className={`${globalStyles.label} ${styles.label}`}
        >
          Confirm Password
          <input
            type="password"
            name="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            className={`${globalStyles.input} ${styles.input}`}
          />
        </label>

        <Button text="Sign up" size="large" />
      </form>
      <p className={styles.altLink}>
        Don't have an account? <Link href="/login">Log in</Link>
      </p>
    </>
  );
};

export default SignupForm;
