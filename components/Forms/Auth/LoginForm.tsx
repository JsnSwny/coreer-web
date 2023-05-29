import styles from "./LoginForm.module.scss";
import axios from "axios";
import { server } from "@/config";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import globalStyles from "@/styles/globalStyles.module.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";

const LoginForm = () => {
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signIn(email, password);

    router.push("/");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label
          htmlFor="email"
          className={`${globalStyles.label} ${styles.label}`}
        >
          Email
          <input
            autoFocus
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

        <Button text="Login" size="large" />
      </form>
      <p className={styles.altLink}>
        Don't have an account? <Link href="/signup">Sign up</Link>
      </p>
    </>
  );
};

export default LoginForm;
