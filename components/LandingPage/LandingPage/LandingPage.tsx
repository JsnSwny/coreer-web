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
import { useRef } from "react";

const LandingPage = () => {
	const demoSectionRef = useRef<HTMLDivElement | null>(null);

	return (
		<div className={styles.container}>
			<Hero demoSectionRef={demoSectionRef} />
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
						Beta 1.0 aims to provide a unique professional networking experience
						for the tech industry. Create your tech profile, showcase your
						projects, and discover new people!
					</p>
					<ul className={styles.featureList}>
						<Feature
							icon={faIdCard}
							title="Customisable Profile"
							text="Easily add your work experience, education and select tech-related interests and skills to customise your profile"
						/>
						<Feature
							icon={faFileImage}
							title="Project Showcase"
							text="Show off your talent and growth by creating project case studies to display on your profile"
						/>
						<Feature
							icon={faRobot}
							title="Personalised Recommendations"
							text="Enable discovery to see user recommendations based on your profile and interactions"
						/>
					</ul>
				</Container>
			</section>
			<section
				ref={demoSectionRef}
				className={`${styles.section} ${styles.sectionWhite}`}
			>
				<Container>
					<h2 className={styles.sectionTitle}>Discover Mode</h2>
					<p className={styles.sectionDescription}>
						Personalised recommendations, unlocks at 100 users
					</p>

					<video className={styles.video} controls muted loop>
						<source src="/images/discover-demo.webm" type="video/webm" />
					</video>
				</Container>
			</section>
			<Footer />
		</div>
	);
};

export default LandingPage;
