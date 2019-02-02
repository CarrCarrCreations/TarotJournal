import React from "react";
import { Dropdown } from "semantic-ui-react";
import styles from "./SearchSelect.module.css";

const SearchSelect = props => {
  // const cards = [
  //   { key: "Ace of Wands", value: "Ace of Wands", text: "Ace of Wands" },
  //   { key: "Ace of Cups", value: "Ace of Cups", text: "Ace of Cups" }
  // ];

  const majors = [
    "The Fool",
    "The Magician",
    "The High Priestess",
    "The Empress",
    "The Emperor",
    "The Hierophant",
    "The Lovers",
    "The Chariot",
    "Justice",
    "The Hermit",
    "Wheel of Fortune",
    "Strength",
    "The Hanged Man",
    "Death",
    "Temperance",
    "The Devil",
    "The Tower",
    "The Star",
    "The Moon",
    "The Sun",
    "Judgement",
    "The World"
  ];

  const suits = ["Wands", "Swords", "Cups", "Pentacles"];
  const courts = {
    1: "Ace",
    11: "Page",
    12: "Knight",
    13: "Queen",
    14: "King"
  };
  const createMajors = () => {
    return majors.map((value, index) => {
      return {
        key: value,
        major: true,
        number: index,
        value: value,
        deck: null,
        image: null,
        text: value
      };
    });
  };

  const createMinors = () => {
    const minors = [];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 1; j <= 14; j++) {
        let name = courts.hasOwnProperty(j)
          ? `${courts[j]} of ${suits[i]}`
          : `${j} of ${suits[i]}`;

        minors.push({
          key: name,
          major: false,
          number: j,
          value: suits[i],
          deck: null,
          image: null,
          text: name
        });
      }
    }

    return minors;
  };

  const tarotDeck = createMajors();
  const minorArcana = createMinors();
  minorArcana.forEach(element => tarotDeck.push(element));

  return (
    <div>
      <Dropdown
        className={styles.SearchSelect}
        placeholder="Select Card"
        search
        selection
        options={tarotDeck}
        onChange={(event, selected) => props.changed(event, selected)}
      />
    </div>
  );
};

export default SearchSelect;
