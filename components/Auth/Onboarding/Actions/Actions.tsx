import Button from "@/components/Button/Button";
import globalStyles from "@/styles/globalStyles.module.scss";
import styles from "./Actions.module.scss";

interface ActionsProps {
	actionText?: string;
	disabled?: boolean;
	loading?: boolean;
}

const Actions = ({
	actionText = "Next Step",
	disabled = false,
	loading = false,
}: ActionsProps) => {
	return (
		<div className={styles.actions}>
			<Button loading={loading} text={actionText} disabled={disabled} />
		</div>
	);
};

export default Actions;
