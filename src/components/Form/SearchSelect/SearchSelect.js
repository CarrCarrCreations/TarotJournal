import { Dropdown } from "semantic-ui-react";
import styles from "./SearchSelect.module.css";

import React from "react";

const SearchSelect = props => {
  return (
    <div>
      <label className={styles.Label}>{props.label}</label>
      <Dropdown
        className={styles.SearchSelect}
        placeholder="Select Card"
        search
        selection
        options={props.options}
        value={props.value}
        onChange={(event, selected) => props.changed(event, selected)}
      />
    </div>
  );
};

export default SearchSelect;
