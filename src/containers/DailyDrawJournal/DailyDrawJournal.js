import React, { Component } from "react";
import TarotCard from "../../components/TarotCard/TarotCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "../../components/Form/Input/Input";
import Textarea from "../../components/Form/Textarea/textarea";
import styles from "./DailyDrawJournal.module.css";
import SearchSelect from "../../components/Form/SearchSelect/SearchSelect";
import Axios from "../../axios-dailyDraw";
import tarotDeck from "../../data/TarotDeck/tarotDeck.json";
import moonPhaseData from "../../data/Moon/moonData2019.json";

class DailyDrawJournal extends Component {
  state = {
    dailyDraw: {
      date: new Date(),
      question: "",
      mood: "",
      moon: "",
      numerology: 0,
      tarotCard: "",
      journalEntry: ""
    },
    tarotCardOptions: [],
    moonPhaseOptions: [],
    moonPhases: ["New Moon", "First Quarter", "Full Moon", "Last Quarter"]
  };

  componentDidMount() {
    this.calculateMoonPhase();
    this.calculateMoonPhaseOptions();
    this.calculateTarotCardOptions();
  }

  inputHander = event => {
    const key = event.target.id;
    const value = event.target.value;

    this.setState(
      prevState => ({
        dailyDraw: {
          ...prevState.dailyDraw,
          [key]: value
        }
      }),
      () => {
        console.log(this.state);
      }
    );
  };

  moonPhaseHandler = (_, selectedValue) => {
    const value = selectedValue.value;

    this.setState(
      prevState => ({
        dailyDraw: {
          ...prevState.dailyDraw,
          moon: value
        }
      }),
      () => {
        console.log(this.state);
      }
    );
  };

  cardSelectedHandler = (_, selectedValue) => {
    const value = selectedValue.value;
    const number = tarotDeck.find(card => card.key === value).number;

    this.setState(
      prevState => ({
        dailyDraw: {
          ...prevState.dailyDraw,
          tarotCard: value,
          numerology: number
        }
      }),
      () => {
        console.log(this.state);
      }
    );
  };

  submitHandler = () => {
    Axios.post("/dailyDraw.json", this.state.dailyDraw)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  updateMoonPhaseHandler = (moonData, i) => {
    this.setState(prevState => ({
      dailyDraw: {
        ...prevState.dailyDraw,
        moon: moonData[i].phase
      }
    }));
  };

  calculateMoonPhase = () => {
    const moonData = moonPhaseData.phasedata;

    for (let i = 0; i + 1 < moonData.length; i++) {
      const currDate = this.state.dailyDraw.date;
      const minPhase = new Date(moonData[i].date);
      const maxPhase = new Date(moonData[i + 1].date);

      if (currDate.getDate() === minPhase.getDate()) {
        this.updateMoonPhaseHandler(moonData, i);
        break;
      } else if (currDate > minPhase && currDate < maxPhase) {
        this.updateMoonPhaseHandler(moonData, i);
        break;
      } else if (currDate.getDate() === maxPhase.getDate()) {
        this.updateMoonPhaseHandler(moonData, i);
        break;
      } else {
      }
    }
  };

  calculateMoonPhaseOptions = () => {
    let options = this.state.moonPhases.map(phase => {
      return {
        key: phase,
        value: phase,
        text: phase
      };
    });

    this.setState({ moonPhaseOptions: options });
  };

  calculateTarotCardOptions = () => {
    let options = tarotDeck.map(element => {
      return {
        key: element.key,
        value: element.key,
        text: element.text
      };
    });

    this.setState({ tarotCardOptions: options });
  };

  render() {
    const currentDate = this.state.dailyDraw.date.toJSON().slice(0, 10);

    return (
      <div>
        <Form>
          <Input
            controlId="date"
            label="Date"
            value={currentDate}
            changed={this.inputHander}
          />
          <Input
            controlId="question"
            label="Question"
            changed={this.inputHander}
          />
          <Input
            controlId="mood"
            label="Mood"
            placeholder="Current Mood"
            changed={this.inputHander}
          />
          <SearchSelect
            label="Moon Phase"
            changed={this.moonPhaseHandler}
            value={this.state.dailyDraw.moon}
            options={this.state.moonPhaseOptions}
          />
          <Input
            controlId="numerology"
            label="Numerology"
            value={this.state.dailyDraw.numerology}
            changed={this.inputHander}
          />
          <TarotCard name={this.state.dailyDraw.tarotCard} />
          <SearchSelect
            label="Tarot Card"
            changed={this.cardSelectedHandler}
            options={this.state.tarotCardOptions}
          />
          <Textarea
            controlId="journalEntry"
            label="Journal Entry"
            as="textarea"
            rows="3"
            changed={this.inputHander}
          />
          <Button
            variant="primary"
            type="submit"
            className={styles.Button}
            onClick={this.submitHandler}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default DailyDrawJournal;
