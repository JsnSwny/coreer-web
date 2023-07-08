import Container from "@/components/Container/Container";
import styles from "./Hero.module.scss";

interface HeroProps {
	demoSectionRef: HTMLDivElement | null;
}

const Hero = ({ demoSectionRef }: HeroProps) => {
	return (
		<section className={styles.hero}>
			<video className={styles.videoBackground} autoPlay muted loop>
				<source src="/images/discover-demo.mp4" type="video/mp4" />
			</video>
			<div className={styles.overlay} />
			<Container>
				<div className={styles.heroWrapper}>
					<div className={styles.heroLeft}>
						<h1 className={styles.heroTitle}>
							Personalised <span>Professional Networking</span> for the{" "}
							<span>Tech Industry</span>
						</h1>
						<p className={styles.heroTagline}>
							Join the beta to find students, professionals and recruiters
							tailored to your interests.
						</p>
						<div className={styles.heroActions}>
							<button className={styles.button}>Join the Beta</button>
							<button
								className={`${styles.button} ${styles.buttonAlt}`}
								onClick={() =>
									demoSectionRef &&
									demoSectionRef.scrollIntoView({ behavior: "smooth" })
								}
							>
								Watch Demo
							</button>
						</div>
					</div>
					<img
						className={styles.heroRight}
						src="/images/landing-hero-image.svg"
					/>
				</div>
			</Container>
		</section>
	);
};

export default Hero;
