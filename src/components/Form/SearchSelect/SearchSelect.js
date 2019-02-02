import { Dropdown } from "semantic-ui-react";
import styles from "./SearchSelect.module.css";
import tarotDeck from "../../../data/tarotDeck.json";

import React from "react";

const SearchSelect = props => {
  let options = tarotDeck.map(element => {
    return {
      key: element.key,
      value: element.key,
      text: element.text
    };
  });

  return (
    <div>
      <Dropdown
        className={styles.SearchSelect}
        placeholder="Select Card"
        search
        selection
        options={options}
        onChange={(event, selected) => props.changed(event, selected)}
      />
    </div>
  );
};

export default SearchSelect;
