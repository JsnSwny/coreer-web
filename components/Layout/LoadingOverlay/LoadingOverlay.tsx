import React from "react";
import { FaSpinner } from "react-icons/fa";
import styles from "./LoadingOverlay.module.scss";

const LoadingOverlay: React.FC = () => {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingSpinner}>
        <FaSpinner className={styles.spinnerIcon} />
        <p>Getting Recommendations...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
