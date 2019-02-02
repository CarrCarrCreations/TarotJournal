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
    }
  };

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

  cardSelectedHandler = (_, selectedValue) => {
    const value = selectedValue.value;
    const number = tarotDeck.filter(card => card.key === value)[0].number;

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
    Axios.post("/dailyDraw.json", this.state)
      .then(response => console.log(response))
      .catch(error => console.log(error));
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
          <Input
            controlId="moon"
            label="Moon Phase"
            changed={this.inputHander}
          />
          <Input
            controlId="numerology"
            label="Numerology"
            value={this.state.dailyDraw.numerology}
            changed={this.inputHander}
          />

          <TarotCard name={this.state.tarotCard} />
          <SearchSelect
            changed={this.cardSelectedHandler}
            options={tarotDeck}
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
