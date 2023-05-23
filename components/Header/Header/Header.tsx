import Nav from "../Nav/Nav";
import styles from "./Header.module.scss";
import Container from "../../Container/Container";
import Search from "../Search/Search";
import Link from "next/link";
import NavProfile from "../NavProfile/NavProfile";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  console.log(router);

  const largeContainer = router.pathname == "/messages/[id]";

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
            <NavProfile />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
