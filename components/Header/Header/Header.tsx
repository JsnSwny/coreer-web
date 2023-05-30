import Nav from "../Nav/Nav";
import styles from "./Header.module.scss";
import Container from "../../Container/Container";
import Search from "../Search/Search";
import Link from "next/link";
import NavProfile from "../NavProfile/NavProfile";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faStar } from "@fortawesome/free-regular-svg-icons";

const Header = () => {
  const router = useRouter();

  console.log(router);

  const largeContainer = router.pathname.includes("/messages");

  return (
    <header className={styles.header}>
      <Container size={largeContainer ? "large" : "medium"}>
        <div className={styles.wrapper}>
          <Nav>
            <Link href="/">
              <p className={styles.title}>coreer.</p>
            </Link>
          </Nav>
          <div className={styles.right}>
            <Search />
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
