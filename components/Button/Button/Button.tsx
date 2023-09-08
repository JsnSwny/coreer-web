import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./Button.module.scss";
import { ImSpinner2 } from "react-icons/im";

interface ButtonProps {
	text: string;
	variant?: string;
	onClick?: () => void;
	link?: string;
	size?: string;
	alt?: boolean;
	icon?: IconProp;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	color?: string;
	disabled?: boolean;
	submit?: boolean;
	externalLink?: boolean;
	loading?: boolean;
}

const Button = ({
	text,
	variant = "default",
	link = "",
	size = "medium",
	icon,
	alt,
	onClick,
	onMouseEnter,
	onMouseLeave,
	color = "primary",
	disabled = false,
	submit = true,
	externalLink = false,
	loading = false,
}: ButtonProps) => {
	return (
		<button
			data-variant={variant}
			onClick={onClick}
			className={`${styles.btn} ${styles[color]} ${
				!link ? styles.noLink : ""
			} ${styles[size]} ${alt ? styles.alt : ""}`}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			disabled={disabled || loading}
			type={submit ? "submit" : "button"}
		>
			{link ? (
				<Link
					href={link}
					className={`${styles.link} ${styles[size]} ${alt ? styles.alt : ""}`}
					target={externalLink ? "_blank" : ""}
				>
					{icon && <FontAwesomeIcon icon={icon} />}
					{text}
				</Link>
			) : (
				<>
					{icon && <FontAwesomeIcon icon={icon} />} {text}
				</>
			)}
			{loading && <ImSpinner2 className={styles.spinner} />}
		</button>
	);
};

export default Button;
