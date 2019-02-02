import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import styles from "./SearchSelect.module.css";
import axios from "../../../axios-dailyDraw";

class SearchSelect extends Component {
  state = {
    options: null
  };

  componentDidMount() {
    axios
      .get("/tarotDeck.json")
      .then(response => {
        Object.keys(response.data).forEach(element => {
          let options = response.data[element].tarotDeck.map(element => {
            return {
              key: element.key,
              value: element.key,
              text: element.text
            };
          });
          this.setState({ options: options }, () => console.log(this.state));
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // createMajors = majors => {
  //   return majors.map((value, index) => {
  //     return {
  //       key: value,
  //       major: true,
  //       number: index,
  //       value: value,
  //       deck: null,
  //       image: null,
  //       text: value
  //     };
  //   });
  // };

  // createMinors = (suits, courts) => {
  //   const minors = [];
  //   for (let i = 0; i < suits.length; i++) {
  //     for (let j = 1; j <= 14; j++) {
  //       let name = courts.hasOwnProperty(j)
  //         ? `${courts[j]} of ${suits[i]}`
  //         : `${j} of ${suits[i]}`;

  //       minors.push({
  //         key: name,
  //         major: false,
  //         number: j,
  //         value: suits[i],
  //         deck: null,
  //         image: null,
  //         text: name
  //       });
  //     }
  //   }

  //   return minors;
  // };

  // submitHandler = (tarotDeck, minorArcana) => {
  //   minorArcana.forEach(element => tarotDeck.push(element));
  //   axios
  //     .post("/tarotDeck.json", { tarotDeck: tarotDeck })
  //     .then(response => console.log(response))
  //     .catch(error => console.log(error));
  // };

  render() {
    //   let majors = [
    //     "The Fool",
    //     "The Magician",
    //     "The High Priestess",
    //     "The Empress",
    //     "The Emperor",
    //     "The Hierophant",
    //     "The Lovers",
    //     "The Chariot",
    //     "Justice",
    //     "The Hermit",
    //     "Wheel of Fortune",
    //     "Strength",
    //     "The Hanged Man",
    //     "Death",
    //     "Temperance",
    //     "The Devil",
    //     "The Tower",
    //     "The Star",
    //     "The Moon",
    //     "The Sun",
    //     "Judgement",
    //     "The World"
    //   ];

    //   let suits = ["Wands", "Swords", "Cups", "Pentacles"];
    //   let courts = {
    //     1: "Ace",
    //     11: "Page",
    //     12: "Knight",
    //     13: "Queen",
    //     14: "King"
    //   };

    //   let tarotDeck = this.createMajors(majors);
    //   let minorArcana = this.createMinors(suits, courts);
    //   this.submitHandler(tarotDeck, minorArcana);

    return (
      <div>
        <Dropdown
          className={styles.SearchSelect}
          placeholder="Select Card"
          search
          selection
          options={this.state.options}
          onChange={(event, selected) => this.props.changed(event, selected)}
        />
      </div>
    );
  }
}

export default SearchSelect;
