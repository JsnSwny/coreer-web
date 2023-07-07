import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "./Feature.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FeatureProps {
  icon: IconProp;
  title: string;
  text: string;
}

const Feature = ({ icon, title, text }: FeatureProps) => {
  return (
    <li className={styles.feature}>
      <FontAwesomeIcon icon={icon} />
      <h3>{title}</h3>
      <p>{text}</p>
    </li>
  );
};

export default Feature;
