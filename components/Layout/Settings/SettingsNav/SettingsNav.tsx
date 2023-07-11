import styles from "./SettingsNav.module.scss";

const SettingsNav = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				<li className={styles.active}>Privacy</li>
			</ul>
		</nav>
	);
};

export default SettingsNav;
