import Container from "@/components/Container/Container";
import styles from "./ExploreBanner.module.scss";

const ExploreBanner = () => {
	return (
		<div className={styles.banner}>
			<Container size="large">
				<h1>Discover Projects from Talented Students</h1>
			</Container>
		</div>
	);
};

export default ExploreBanner;
