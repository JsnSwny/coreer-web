import { useAuth } from "@/contexts/AuthContext";
import {
  faEnvelope,
  faFileCirclePlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
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
  const largeContainer = router.pathname == "/";

  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <Nav>
            <Link href="/" className={styles.logo}>
              {/* <img src="https://coreer-static.s3.eu-west-2.amazonaws.com/media/favicon/favicon.svg" /> */}
              <p className={styles.title}>
                <span>co</span>reer
              </p>
            </Link>
            {/* <Search /> */}
          </Nav>

          <div className={styles.right}>
            {user ? (
              <>
                {/* <Link href="/likes" className={styles.icon}>
									<FontAwesomeIcon icon={faFileCirclePlus} />
								</Link>

								<Link href="/messages" className={styles.icon}>
									<FontAwesomeIcon icon={faEnvelope} />
								</Link> */}
                <NavProfile />
              </>
            ) : (
              <Link href="/login" className={styles.icon}>
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
