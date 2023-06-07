import globalStyles from "@/styles/globalStyles.module.scss";
import { FormEvent, useState } from "react";
import styles from "./PersonalDetails.module.scss";
import { useRouter } from "next/router";
import Actions from "../Actions/Actions";
import { useAuth } from "@/contexts/AuthContext";
import LocationSearchInput from "@/components/Forms/Inputs/LocationSearchInput";

const PersonalDetails = () => {
  const router = useRouter();
  const { user, updateUser, githubDetails } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateUser({ first_name: firstName, last_name: lastName, location });
    router.push("/onboarding/about-you");
  };

  const [firstName, setFirstName] = useState(user!.first_name);
  const [lastName, setLastName] = useState(user!.last_name);
  const [location, setLocation] = useState("");

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={globalStyles.formGroup}>
        <div className={styles.inputWrapper}>
          <div style={{ flex: 1 }}>
            <label htmlFor="first_name" className={globalStyles.label}>
              First name
            </label>
            <input
              type="text"
              name="first_name"
              value={firstName}
              autoFocus
              onChange={(e) => setFirstName(e.target.value)}
              required
              className={globalStyles.input}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="last_name" className={globalStyles.label}>
              Last name
            </label>
            <input
              type="text"
              name="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className={globalStyles.input}
            />
          </div>
        </div>
      </div>
      <div className={globalStyles.formGroup}>
        <label htmlFor="location" className={globalStyles.label}>
          Location
        </label>
        <LocationSearchInput location={location} setLocation={setLocation} />
      </div>

      <Actions />
    </form>
  );
};

export default PersonalDetails;
