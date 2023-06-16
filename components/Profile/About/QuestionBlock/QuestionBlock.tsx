import QuestionModalForm from "@/components/Modal/Forms/QuestionModalForm/QuestionModalForm";
import Modal from "@/components/Modal/Modal/Modal";
import { UserAnswer } from "@/interfaces/question.model";
import { faPencil, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "./QuestionBlock.module.scss";
interface QuestionBlockProps {
  item: UserAnswer;
  showEdit: boolean;
}

const QuestionBlock = ({ item, showEdit }: QuestionBlockProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal title="Question" isOpen={isOpen} onClose={closeModal}>
        <QuestionModalForm closeModal={closeModal} userAnswer={item} />
      </Modal>
      <li className={styles.questionBlock}>
        {/* <FaQuestion className={styles.icon} /> */}
        <div className={styles.header}>
          <FontAwesomeIcon icon={faQuestion} className={styles.icon} />
          {showEdit && (
            <FontAwesomeIcon
              icon={faPencil}
              className={styles.edit}
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>

        <h2>{item.question.text}</h2>
        <p>{item.answer}</p>
      </li>
    </>
  );
};

export default QuestionBlock;
