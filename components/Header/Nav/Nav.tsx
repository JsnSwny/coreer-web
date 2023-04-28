import React from "react";
import styles from "./Nav.module.scss";
import NavLinks from "../NavLinks/NavLinks";

interface NavProps {
  children: React.ReactNode;
}

const Nav = ({ children }: NavProps) => {
  return (
    <nav className={styles.container}>
      {children}
      {/* <NavLinks /> */}
    </nav>
  );
};

export default Nav;
