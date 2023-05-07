import styles from "./SignupForm.module.scss";
import axios from "axios";
import { server } from "@/config";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

const SignupForm = () => {
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signUp(email, password, passwordConfirm);

    router.push("/");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="email" className={styles.label}>
        Email
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
      </label>

      <label htmlFor="password" className={styles.label}>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
      </label>

      <label htmlFor="password" className={styles.label}>
        Confirm Password
        <input
          type="password"
          name="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
          className={styles.input}
        />
      </label>

      <button type="submit" className={styles.button}>
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
