import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NavLinks from "../Header/NavLinks/NavLinks";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <p className={styles.title}>coreer.</p>
      <NavLinks />
    </div>
  );
};

export default Sidebar;
