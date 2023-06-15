import styles from "./OnboardingWrapper.module.scss";
import OnboardingNav from "../OnboardingNav/OnboardingNav";

interface OnboardingWrapperProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

const OnboardingWrapper = ({
	title,
	description,
	children,
}: OnboardingWrapperProps) => {
	return (
		<div className={styles.wrapper}>
			<h3 className={styles.logo}>Coreer.</h3>
			<OnboardingNav />
			<div className={styles.content}>
				<div className={styles.header}>
					<h1 className={styles.title}>{title}</h1>
					{description && <p className={styles.description}>{description}</p>}
				</div>
				{children}
			</div>
		</div>
	);
};

export default OnboardingWrapper;
