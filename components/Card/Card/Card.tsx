import { calculateTimeDifference } from "@/utils/calculateTimeDifference";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, parseISO } from "date-fns";
import styles from "./Card.module.scss";

interface CardProps {
  image: string | null;
  title: string;
  subtitle: string;
  body: string;
  start_date: string;
  end_date: string | null;
  size?: string;
  action?: () => void;
  showEdit: boolean;
}

const Card = ({
  image,
  title,
  subtitle,
  body,
  start_date,
  end_date,
  size,
  action,
  showEdit,
}: CardProps) => {
  return (
    <div className={`${styles.card} ${size && styles[size]}`}>
      {image && <img className={styles.image} src={image} />}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
        {start_date && (
          <p className={styles.date}>
            {`${format(parseISO(start_date), "MMMM yyyy")} - ${
              end_date ? format(parseISO(end_date), "MMMM yyyy") : "Present"
            }`}{" "}
            ({calculateTimeDifference(start_date, end_date)})
          </p>
        )}
        {body && <p className={styles.body}>{body}</p>}
      </div>
      {showEdit && <FontAwesomeIcon icon={faPencil} className={styles.icon} onClick={action} />}
    </div>
  );
};

export default Card;
