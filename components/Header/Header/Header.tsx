import { faEnvelope, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "../../Container/Container";
import Nav from "../Nav/Nav";
import NavProfile from "../NavProfile/NavProfile";
import Search from "../Search/Search";
import styles from "./Header.module.scss";

const Header = () => {
  const router = useRouter();
  // const largeContainer = router.pathname.includes("/messages");

  return (
    <header className={styles.header}>
      <Container size={"medium"}>
        <div className={styles.wrapper}>
          <Nav>
            <Link href="/">
              <p className={styles.title}>coreer</p>
            </Link>
            <Search />
          </Nav>
          <div className={styles.right}>
            <Link href="/likes" className={styles.icon}>
              <FontAwesomeIcon icon={faStar} />
            </Link>

            <Link href="/messages" className={styles.icon}>
              <FontAwesomeIcon icon={faEnvelope} />
            </Link>

            <NavProfile />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
