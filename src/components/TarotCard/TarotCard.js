import React, { useState } from "react";
import styles from "./TarotCard.module.css";

const TarotCard = props => {
  const importAll = r => {
    return r.keys().map(r);
  };

  const [images, setImages] = useState({
    cups: importAll(
      require.context("../../images/RWS/cups", false, /\.(png|jpe?g|svg)$/)
    ),
    wands: importAll(
      require.context("../../images/RWS/wands", false, /\.(png|jpe?g|svg)$/)
    ),
    swords: importAll(
      require.context("../../images/RWS/swords", false, /\.(png|jpe?g|svg)$/)
    ),
    pentacles: importAll(
      require.context("../../images/RWS/pentacles", false, /\.(png|jpe?g|svg)$/)
    ),
    majors: importAll(
      require.context("../../images/RWS/majors", false, /\.(png|jpe?g|svg)$/)
    )
  });

  let card = null;
  if (props.card.major) card = images.majors[props.card.number];
  else {
    switch (props.card.value) {
      case "Cups":
        card = images.cups[props.card.number - 1];
        break;
      case "Pentacles":
        card = images.pentacles[props.card.number - 1];
        break;
      case "Swords":
        card = images.swords[props.card.number - 1];
        break;
      case "Wands":
        card = images.wands[props.card.number - 1];
        break;
      default:
        console.log("error - card suite does not exist");
    }
  }

  return (
    <div style={{ display: props.card.value ? "block" : "none" }}>
      <img src={card} alt={props.card.value} className={styles.TarotCard} />
    </div>
  );
};

export default TarotCard;
