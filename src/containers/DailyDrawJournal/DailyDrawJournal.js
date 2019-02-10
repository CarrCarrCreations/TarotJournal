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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextEditor from "../../components/TextEditor/TextEditor";

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

  componentDidUpdate(nextProps, nextState) {
    if (nextState.dailyDraw.date !== this.state.dailyDraw.date) {
      this.calculateMoonPhase();
    }
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
        console.log("input handler " + this.state);
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
        console.log("moon phase handler " + this.state);
      }
    );
  };

  cardSelectedHandler = (_, selectedValue) => {
    const value = selectedValue.value;
    const card = tarotDeck.find(card => card.text === value);
    const number = tarotDeck.find(card => card.key === value).number;

    this.setState(
      prevState => ({
        dailyDraw: {
          ...prevState.dailyDraw,
          tarotCard: card,
          numerology: number
        }
      }),
      () => {
        console.log("card selected handler " + this.state);
      }
    );
  };

  submitHandler = event => {
    event.preventDefault();
    Axios.post("/dailyDraw.json", this.state.dailyDraw)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  updateMoonPhaseHandler = (moonData, index) => {
    const phase = moonData[index].phase;

    this.setState(
      prevState => ({
        dailyDraw: {
          ...prevState.dailyDraw,
          moon: phase
        }
      }),
      () => {
        console.log(
          "state after updateMoonPhaseHandler " + this.state.dailyDraw.moon
        );
      }
    );
  };

  calculateMoonPhase = () => {
    const moonData = moonPhaseData.phasedata;
    let currDate = this.state.dailyDraw.date;
    currDate.setHours(0, 0, 0, 0);
    currDate = currDate.getTime();

    for (let i = 0; i + 1 < moonData.length; i++) {
      const minPhase = new Date(moonData[i].date).getTime();
      const maxPhase = new Date(moonData[i + 1].date).getTime();

      if (currDate === minPhase) {
        this.updateMoonPhaseHandler(moonData, i);
        break;
      } else if (currDate > minPhase && currDate < maxPhase) {
        this.updateMoonPhaseHandler(moonData, i);
        break;
      } else if (currDate === maxPhase) {
        this.updateMoonPhaseHandler(moonData, i + 1);
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

  handleDateChange = date => {
    this.setState(
      prevState => ({
        dailyDraw: {
          ...prevState.dailyDraw,
          date: date
        }
      }),
      () => {
        console.log("handle date change " + this.state.dailyDraw.date);
      }
    );
  };

  handleEditorOnChange = value => {
    this.setState(
      prevState => ({
        dailyDraw: {
          ...prevState.dailyDraw,
          journalEntry: JSON.stringify(value.toJSON())
        }
      }),
      () => {
        console.log("handle date change " + this.state.dailyDraw.journalEntry);
      }
    );
  };

  render() {
    let tarotCard = null;
    if (this.state.dailyDraw.tarotCard !== "")
      tarotCard = <TarotCard card={this.state.dailyDraw.tarotCard} />;

    return (
      <div>
        <Form onSubmit={this.submitHandler}>
          <Form.Label className={styles.Label}>Date</Form.Label>
          <DatePicker
            className={styles.DatePicker}
            selected={this.state.dailyDraw.date}
            onChange={event => this.handleDateChange(event)}
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
          {tarotCard}
          <SearchSelect
            label="Tarot Card"
            changed={this.cardSelectedHandler}
            options={this.state.tarotCardOptions}
          />
          <TextEditor onChange={this.handleEditorOnChange} />
          <Button variant="primary" type="submit" className={styles.Button}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default DailyDrawJournal;
