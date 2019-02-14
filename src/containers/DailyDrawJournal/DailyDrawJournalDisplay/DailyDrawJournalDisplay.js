import React, { Component } from "react";
import axios from "../../../axios-dailyDraw";
import TarotCard from "../../../components/TarotCard/TarotCard";
import tarotDeck from "../../../data/TarotDeck/tarotDeck.json";
import TextEditor from "../../../components/TextEditor/TextEditor";
import styles from "./DailyDrawJournalDisplay.module.css";

class DailyDrawJournalDisplay extends Component {
  state = {
    readings: null
  };

  componentDidMount() {
    axios
      .get("/dailyDraw.json")
      .then(response => this.setState({ readings: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    let readings = null;
    if (this.state.readings !== null) {
      readings = Object.keys(this.state.readings).map(id => {
        const reading = this.state.readings[id];
        console.log(reading);
        console.log(reading.tarotCard.key);
        return (
          <div key={id} className={styles.DailyDrawJournalDisplay}>
            <div className={styles.Container}>
              <div className={styles.TextEditor}>
                <p>{reading.date}</p>
                <p>{reading.moon}</p>
                <p>{reading.numerology}</p>
                <p>{reading.mood}</p>
                <TextEditor
                  className={styles.TextEditor}
                  defaultValue={reading.journalEntry}
                  readOnly="true"
                />
              </div>
              <div className={styles.TarotCard}>
                <TarotCard
                  card={tarotDeck.find(
                    card => card.text === reading.tarotCard.key
                  )}
                />
              </div>
            </div>
          </div>
        );
      });
    }

    return <div>{readings}</div>;
  }
}

export default DailyDrawJournalDisplay;
