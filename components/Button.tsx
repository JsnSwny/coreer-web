import styles from "@/styles/Button.module.scss";

interface ButtonProps {
	text: string;
	onClick?: () => void;
}

const Button = ({text, onClick}: ButtonProps) => {
	return <button onClick={onClick} className={styles.container}>{text}</button>
}

export default Button