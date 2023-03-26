import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "@/styles/Nav.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavItemProps {
  link: string;
  icon: IconProp;
  title: string;
}

const NavItem = ({ link, icon, title }: NavItemProps) => {
  const router = useRouter();
  return (
    <li className={styles.nav__item}>
      <Link
        href={link}
        className={`${styles.nav__link} ${
          router.pathname == link ? styles.active : ""
        }`}
      >
        <FontAwesomeIcon icon={icon} className={styles.icon} />
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default NavItem;
