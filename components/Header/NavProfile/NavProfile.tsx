import { useContext, useState } from "react";
import Link from "next/link";
import styles from "./NavProfile.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

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
				{user && user.image && (
					<Image
						src={user.image}
						width={36}
						height={36}
						alt="User profile image"
						className={styles.profileImage}
					/>
				)}
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
