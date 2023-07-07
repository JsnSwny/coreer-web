import Link from "next/link";
import styles from "./Auth.module.scss";

interface AuthProps {
  title: string;
  children: React.ReactNode;
}

const Auth = ({ title, children }: AuthProps) => {
  return (
    <section className={styles.container}>
      <Link className={styles.logo} href="/">
        co<span>reer</span>
      </Link>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </div>
    </section>
  );
};

export default Auth;
