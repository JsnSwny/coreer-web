import React from "react";
import styles from "./Nav.module.scss";

interface NavProps {
  children: React.ReactNode;
}

const Nav = ({ children }: NavProps) => {
  return <nav className={styles.container}>{children}</nav>;
};

export default Nav;
