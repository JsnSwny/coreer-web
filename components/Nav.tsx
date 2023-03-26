import React from "react";
import styles from "@/styles/Nav.module.scss";
import NavLinks from "./NavLinks";

interface NavProps {
  children: React.ReactNode;
}

const Nav = ({ children }: NavProps) => {
  return (
    <nav className={styles.nav}>
      {children}
      <NavLinks />
    </nav>
  );
};

export default Nav;
