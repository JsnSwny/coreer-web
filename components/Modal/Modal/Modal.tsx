import React, { useState } from "react";
import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import globalStyles from "@/styles/globalStyles.module.scss";
import Button from "@/components/Button/Button";
import { useAuth } from "@/contexts/AuthContext";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  description?: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </div>

          <button className={styles.closeButton} onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
