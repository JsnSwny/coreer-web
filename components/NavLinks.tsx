import styles from "@/styles/Nav.module.scss";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { faComment as farComment } from "@fortawesome/free-regular-svg-icons";
import { faUser as farUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavItem from "./NavItem";

const NavLinks = () => {
  return (
    <ul className={styles.nav__list}>
      <NavItem link="/" icon={faHouse} activeIcon={faHouse} title="Home" />
      <NavItem
        link="/messages"
        icon={faComment}
        activeIcon={faComment}
        title="Messages"
      />
      <NavItem
        link="/profile/1"
        icon={faUser}
        activeIcon={faUser}
        title="Profile"
      />
    </ul>
  );
};

export default NavLinks;
