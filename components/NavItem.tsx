import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "@/styles/Nav.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavItemProps {
  link: string;
  icon: IconProp;
  activeIcon: IconProp;
  title: string;
}

const NavItem = ({ link, icon, activeIcon, title }: NavItemProps) => {
  const router = useRouter();

  const isActive = router.asPath == link;

  return (
    <li className={styles.nav__item}>
      <Link
        href={link}
        className={`${styles.nav__link} ${isActive ? styles.active : ""}`}
      >
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon
            icon={isActive ? activeIcon : icon}
            className={`${styles.icon} ${isActive ? styles.iconActive : ""}`}
          />
        </div>

        <span>{title}</span>
      </Link>
    </li>
  );
};

export default NavItem;
