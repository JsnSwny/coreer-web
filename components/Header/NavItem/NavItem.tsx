import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavItem.module.scss";

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
    <li className={`${styles.container}`}>
      <Link href={link} className={`${styles.link} ${isActive ? styles.active : ""}`}>
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
