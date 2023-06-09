import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./NavProfile.module.scss";
import { useAuth } from "@/contexts/AuthContext";

export default function NavProfile() {
  const { user, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className={styles.profile}>
      <button className={styles.profileButton} onClick={handleMenuClick}>
        <img src={user?.image} className={styles.profileImage} />
      </button>
      {showMenu && (
        <ul className={styles.menu}>
          <li>
            <Link
              href={`/${user?.username}`}
              className={styles.menuItem}
              onClick={() => handleMenuClick()}
            >
              View Profile
            </Link>
          </li>
          <li>
            <button className={styles.menuItem} onClick={handleSignOut}>
              Sign out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
