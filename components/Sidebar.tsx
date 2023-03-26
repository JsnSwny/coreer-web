import styles from "@/styles/Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NavLinks from "./NavLinks";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <span className={styles.title}>coreer</span>
      <NavLinks />
    </div>
  );
};

export default Sidebar;
