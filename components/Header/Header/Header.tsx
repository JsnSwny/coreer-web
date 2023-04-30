import Nav from "../Nav/Nav";
import styles from "./Header.module.scss";
import Container from "../../Container/Container";
import Search from "../Search/Search";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <Nav>
            <Link href="/">
              <p className={styles.title}>coreer.</p>
            </Link>
          </Nav>
          <Search />
        </div>
      </Container>
    </header>
  );
};

export default Header;
