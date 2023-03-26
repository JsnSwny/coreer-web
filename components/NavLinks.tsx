import styles from "@/styles/Nav.module.scss";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import NavItem from "./NavItem";

const NavLinks = () => {
  return (
    <ul className={styles.nav__list}>
      <NavItem link="/" icon={faHome} title="Home" />
      <NavItem link="/messages" icon={faComment} title="Messages" />
    </ul>
  );
};

export default NavLinks;
