import styles from "./AuthWrapper.module.scss";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default AuthWrapper;
