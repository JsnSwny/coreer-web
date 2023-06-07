import styles from "./Nav.module.scss";

interface NavProps {
  section: string;
  setSection: (section: string) => void;
}

const Nav = ({ section, setSection }: NavProps) => {
  return (
    <ul className={styles.nav}>
      <li
        className={section == "Projects" ? styles.active : ""}
        onClick={() => setSection("Projects")}
      >
        <h3>Projects</h3>
      </li>
      <li
        className={section == "About" ? styles.active : ""}
        onClick={() => setSection("About")}
      >
        <h3>About</h3>
      </li>
      <li
        className={section == "Similar Users" ? styles.active : ""}
        onClick={() => setSection("Similar Users")}
      >
        <h3>Similar Users</h3>
      </li>
    </ul>
  );
};

export default Nav;
