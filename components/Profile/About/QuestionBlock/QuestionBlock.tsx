import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./QuestionBlock.module.scss";
import { FaQuestion } from "react-icons/fa";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

const QuestionBlock = () => {
  return (
    <li className={styles.questionBlock}>
      {/* <FaQuestion className={styles.icon} /> */}
      <FontAwesomeIcon icon={faQuestion} className={styles.icon} />
      <h2>What are you looking to achieve in your career?</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        facilis accusamus cupiditate repellendus corporis dolor alias velit!
        Quaerat molestias cupiditate ex tempora nam unde adipisci corrupti sint
        rerum officiis? Architecto voluptas, culpa sequi nostrum asperiores
        nobis deserunt, corporis beatae aliquam quis animi quos odio maxime,
        temporibus amet iusto ea fugiat.
      </p>
    </li>
  );
};

export default QuestionBlock;
