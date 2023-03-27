import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  variant?: string;
  onClick?: () => void;
}

const Button = ({ text, variant = "default", onClick }: ButtonProps) => {
  return (
    <button data-variant={variant} onClick={onClick} className={styles.btn}>
      {text}
    </button>
  );
};

export default Button;
