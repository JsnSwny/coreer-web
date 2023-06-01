import { format } from "date-fns";
import React from "react";
import styles from "./Card.module.scss";

type EndDate = Date | "Present";

interface CardProps {
  image: string | null;
  title: string;
  subtitle: string;
  body: string;
  start_date?: Date;
  end_date?: EndDate;
  size?: string;
}

const Card = ({
  image,
  title,
  subtitle,
  body,
  start_date,
  end_date,
  size,
}: CardProps) => {
  return (
    <div className={`${styles.card} ${size && styles[size]}`}>
      {image && <img className={styles.image} src={image} />}
      <div className={styles.content}>
        {start_date && (
          <p className={styles.date}>
            {`${format(start_date, "MMM yyyy")} - ${end_date}`}
          </p>
        )}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.body}>{body}</p>
      </div>
    </div>
  );
};

export default Card;
