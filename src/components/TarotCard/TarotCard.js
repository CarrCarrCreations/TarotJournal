import React from "react";
import styles from "./TarotCard.module.css";

const TarotCard = props => {
  return (
    <div
      className={styles.TarotCard}
      style={{ display: props.name ? "block" : "none" }}
    >
      <p>{props.name}</p>
    </div>
  );
};

export default TarotCard;
