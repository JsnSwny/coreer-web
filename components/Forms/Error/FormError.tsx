import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./FormError.module.scss";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface FormErrorProps {
	message: string | undefined;
	margin?: boolean;
}

const FormError = ({ message, margin }: FormErrorProps) => {
	return message ? (
		<div className={`${styles.error} ${margin ? styles.margin : ""}`}>
			<FontAwesomeIcon icon={faWarning} />
			{message}
		</div>
	) : (
		<></>
	);
};

export default FormError;
