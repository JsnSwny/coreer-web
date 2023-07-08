import Header from "@/components/Header/Header/Header";
import styles from "./LandingPage.module.scss";
import Container from "@/components/Container/Container";
import Hero from "../Hero/Hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBriefcase,
	faEye,
	faFileImage,
	faIdCard,
	faRobot,
	faUserAstronaut,
	faUserGraduate,
	faUserSecret,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import ProgressCard from "../ProgressCard/ProgressCard";
import Feature from "../Feature/Feature";
import Footer from "../Footer/Footer";
import CapacityList from "../CapacityList/CapacityList";

const LandingPage = () => {
	return (
		<div className={styles.container}>
			<Hero />
			<section className={`${styles.section} ${styles.sectionWhite}`}>
				<Container>
					<h2 className={styles.sectionTitle}>Beta 1.0</h2>
					<p className={styles.sectionDescription}>
						The initial Beta will consist of 60 Students, 20 Professionals, and
						10 Recruiters. Matchmaking will be enabled once this capacity has
						been reached. Sign up now and verify your account to join Beta 1.0.
					</p>
					<CapacityList />
				</Container>
			</section>
			<section className={`${styles.section}`}>
				<Container>
					<h2 className={styles.sectionTitle}>Features</h2>
					<p className={styles.sectionDescription}>
						The initial Beta will consist of 60 Students, 20 Professionals, and
						10 Recruiters. Matchmaking will be enabled once this capacity has
						been reached. Sign up now and verify your account to join Beta 1.0.
					</p>
					<ul className={styles.featureList}>
						<Feature
							icon={faIdCard}
							title="Customisable Profile"
							text="Filler"
						/>
						<Feature
							icon={faRobot}
							title="Personalised Recommendations"
							text="Filler"
						/>
						<Feature
							icon={faFileImage}
							title="Project Showcase"
							text="Filler"
						/>
					</ul>
				</Container>
			</section>
			<section className={`${styles.section} ${styles.sectionWhite}`}>
				<Container>
					<h2 className={styles.sectionTitle}>Demo</h2>
					<p className={styles.sectionDescription}>
						The initial Beta will consist of 60 Students, 20 Professionals, and
						10 Recruiters. Matchmaking will be enabled once this capacity has
						been reached. Sign up now and verify your account to join Beta 1.0.
					</p>

					<video className={styles.video} controls muted loop>
						<source src="/images/discover-demo.mp4" type="video/mp4" />
					</video>
				</Container>
			</section>
			<Footer />
		</div>
	);
};

export default LandingPage;
