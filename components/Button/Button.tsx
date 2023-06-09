import Link from "next/link";
import styles from "./Button.module.scss";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
    >
      {link ? (
        <Link
          href={link}
          className={`${styles.link} ${styles[size]} ${alt ? styles.alt : ""}`}
        >
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
