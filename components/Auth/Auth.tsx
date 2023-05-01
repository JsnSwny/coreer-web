import styles from "./Auth.module.scss";

interface AuthProps {
  title: string;
  children: React.ReactNode;
}

const Auth = ({ title, children }: AuthProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.logo}>Coreer.</h1>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </section>
  );
};

export default Auth;
