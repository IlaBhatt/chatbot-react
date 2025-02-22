import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  title: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Card: React.FC<CardProps> = ({title, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.content}>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Card;
