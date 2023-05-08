import globalStyles from "@/styles/globalStyles.module.scss";
import styles from "./Actions.module.scss";

const Actions = () => {
  return (
    <div className={styles.actions}>
      <button
        type="submit"
        className={`${styles.button} ${globalStyles.button}`}
      >
        Next Step
      </button>
    </div>
  );
};

export default Actions;
