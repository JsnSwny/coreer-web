import Container from "@/components/Container/Container/Container";
import styles from "./Footer.module.scss";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Container>
				<div className={styles.footerTop}>
					<h4 className={styles.logo}>
						Co<span>reer</span>
					</h4>
					<ul className={styles.links}>
						<li>
							<a href="/privacy-policy.html">Privacy Policy</a>
						</li>
					</ul>
				</div>
				{/* <hr className={styles.divider} /> */}
			</Container>
		</footer>
	);
};

export default Footer;
