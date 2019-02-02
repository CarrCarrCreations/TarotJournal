import React from "react";
import { Dropdown } from "semantic-ui-react";

const SearchSelect = props => {
  const cards = [
    { key: "Ace of Wands", value: "Ace of Wands", text: "Ace of Wands" },
    { key: "Ace of Cups", value: "Ace of Cups", text: "Ace of Cups" }
  ];
  return (
    <div>
      <Dropdown
        placeholder="Select Card"
        search
        selection
        options={cards}
        onChange={(event, selected) => props.changed(event, selected)}
      />
    </div>
  );
};

export default SearchSelect;
