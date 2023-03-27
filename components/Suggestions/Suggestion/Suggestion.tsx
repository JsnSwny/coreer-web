import Link from "next/link";
import styles from "./Suggestion.module.scss";

const Suggestion = () => {
  return (
    <Link href={"/"} className={styles.container}>
      <div className={styles.leftWrapper}>
        <img
          className={styles.image}
          src="https://images.pexels.com/photos/5119214/pexels-photo-5119214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <div className={styles.content}>
          <h4 className={styles.title}>Jane Doe</h4>
          <p className={styles.subtitle}>Web Developer</p>
        </div>
      </div>
      <button className={styles.button}>View</button>
    </Link>
  );
};

export default Suggestion;
