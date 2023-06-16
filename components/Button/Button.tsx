import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./Button.module.scss";

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
}: ButtonProps) => {
  return (
    <button
      data-variant={variant}
      onClick={onClick}
      className={`${styles.btn} ${styles[color]} ${!link ? styles.noLink : ""} ${styles[size]} ${
        alt ? styles.alt : ""
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      type={submit ? "submit" : "button"}
    >
      {link ? (
        <Link href={link} className={`${styles.link} ${styles[size]} ${alt ? styles.alt : ""}`}>
          {icon && <FontAwesomeIcon icon={icon} />}
          {text}
        </Link>
      ) : (
        <>
          {icon && <FontAwesomeIcon icon={icon} />} {text}
        </>
      )}
    </button>
  );
};

export default Button;
