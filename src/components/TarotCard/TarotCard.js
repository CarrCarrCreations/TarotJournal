import React from "react";
import styles from "./TarotCard.module.css";

const TarotCard = props => {
  function importAll(r) {
    return r.keys().map(r);
  }

  const cups = importAll(
    require.context("../../images/RWS/cups", false, /\.(png|jpe?g|svg)$/)
  );
  const pentacles = importAll(
    require.context("../../images/RWS/pentacles", false, /\.(png|jpe?g|svg)$/)
  );
  const swords = importAll(
    require.context("../../images/RWS/swords", false, /\.(png|jpe?g|svg)$/)
  );
  const wands = importAll(
    require.context("../../images/RWS/wands", false, /\.(png|jpe?g|svg)$/)
  );
  const majors = importAll(
    require.context("../../images/RWS/majors", false, /\.(png|jpe?g|svg)$/)
  );

  let card = null;
  console.log(props.card);
  if (props.card.major) card = majors[props.card.number];
  else {
    switch (props.card.value) {
      case "Cups":
        card = cups[props.card.number - 1];
        break;
      case "Pentacles":
        card = pentacles[props.card.number - 1];
        break;
      case "Swords":
        card = swords[props.card.number - 1];
        break;
      case "Wands":
        card = wands[props.card.number - 1];
        break;
    }
  }

  console.log(card);

  return (
    <div style={{ display: props.card.value ? "block" : "none" }}>
      <img src={card} className={styles.TarotCard} />
    </div>
  );
};

export default TarotCard;
