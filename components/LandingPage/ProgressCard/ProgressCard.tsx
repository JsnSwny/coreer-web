import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import styles from "./ProgressCard.module.scss";
import { useEffect, useRef, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface PercentProps {
  percentage: number;
}

interface ProgressCardProps {
  title: string;
  icon: IconProp;
  currentNum: number;
  maxNum: number;
}

const ProgressCard = ({
  title,
  icon,
  currentNum,
  maxNum,
}: ProgressCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  const circleStyle = {
    ["--percent" as string]: percentage, // Type assertion to override type checking
  };

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const size = width;
      setContainerSize(size);
      setTimeout(() => {
        setPercentage((currentNum / maxNum) * 100);
      }, 1000);
    }
  }, []);

  const radius = (containerSize - 48) / 2; // Radius of the circle
  const strokeWidth = 12; // Width of the ring
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const iconSize = radius - strokeWidth; // Adjust the size as needed

  return (
    <li ref={containerRef} className={styles.progressContainer}>
      {containerSize > 0 && (
        <>
          <div className={styles.percent}>
            <svg
              className={styles.progressRing}
              height={radius * 2}
              width={radius * 2}
            >
              <circle
                className={styles.backgroundCircle}
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <circle
                className={styles.progressCircle}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset }}
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
            </svg>
            <FontAwesomeIcon
              icon={icon}
              size="lg"
              color="#333"
              className={styles.icon}
              style={{ width: iconSize, height: iconSize }}
            />
          </div>
          <div className={styles.content}>
            <h3>{title}</h3>
            <p>
              {currentNum} out of {maxNum} (
              {((currentNum / maxNum) * 100).toFixed(0)}%)
            </p>
          </div>
        </>
      )}
    </li>
  );
};

export default ProgressCard;
