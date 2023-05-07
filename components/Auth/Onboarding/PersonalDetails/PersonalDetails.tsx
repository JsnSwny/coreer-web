import globalStyles from "@/styles/globalStyles.module.scss";
import { FormEvent, useState } from "react";
import styles from "./PersonalDetails.module.scss";
import { useRouter } from "next/router";

const PersonalDetails = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/onboarding/interests");
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <label htmlFor="first_name" className={globalStyles.label}>
          First name
          <input
            type="text"
            name="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={globalStyles.input}
          />
        </label>

        <label htmlFor="last_name" className={globalStyles.label}>
          Last name
          <input
            type="text"
            name="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className={globalStyles.input}
          />
        </label>
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          className={`${globalStyles.button} ${styles.button}`}
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default PersonalDetails;
