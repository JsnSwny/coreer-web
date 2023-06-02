import globalStyles from "@/styles/globalStyles.module.scss";
import styles from "./Actions.module.scss";

interface ActionsProps {
  actionText?: string;
}

const Actions = ({ actionText = "Next Step" }: ActionsProps) => {
  return (
    <div className={styles.actions}>
      <button
        type="submit"
        className={`${styles.button} ${globalStyles.button}`}
      >
        {actionText}
      </button>
    </div>
  );
};

export default Actions;
