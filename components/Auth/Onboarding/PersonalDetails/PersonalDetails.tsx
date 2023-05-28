import globalStyles from "@/styles/globalStyles.module.scss";
import { FormEvent, useState } from "react";
import styles from "./PersonalDetails.module.scss";
import { useRouter } from "next/router";
import Actions from "../Actions/Actions";
import { useAuth } from "@/contexts/AuthContext";

const PersonalDetails = () => {
  const router = useRouter();
  const { user, updateUser } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateUser({ first_name: firstName, last_name: lastName });
    router.push("/onboarding/interests");
  };

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <label htmlFor="first_name" className={globalStyles.label}>
          First name
          <input
            type="text"
            name="first_name"
            value={firstName}
            autoFocus
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
      <Actions />
    </form>
  );
};

export default PersonalDetails;
