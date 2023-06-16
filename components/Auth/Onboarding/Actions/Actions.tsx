import Button from "@/components/Button/Button";
import styles from "./Actions.module.scss";

interface ActionsProps {
  actionText?: string;
  disabled?: boolean;
}

const Actions = ({ actionText = "Next Step", disabled = false }: ActionsProps) => {
  return (
    <div className={styles.actions}>
      <Button text={actionText} disabled={disabled} />
    </div>
  );
};

export default Actions;
