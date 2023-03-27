import Nav from "../Nav/Nav";
import styles from "./Header.module.scss";
import Container from "../../Container/Container";
import Search from "../Search/Search";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <Search />
        </div>
      </Container>
    </header>
  );
};

export default Header;
