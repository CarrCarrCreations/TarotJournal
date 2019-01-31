import React, { Component } from "react";
import TarotCard from "../../components/TarotCard/TarotCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "../../components/Form/Input/Input";
import Textarea from "../../components/Form/Textarea/textarea";

class DailyDrawJournal extends Component {
  state = {
    date: new Date(),
    question: "",
    mood: "",
    moon: "",
    numerology: 0,
    tarotCard: null,
    journalEntry: ""
  };

  inputHander = event => {
    const key = event.target.id;
    const value = event.target.value;

    this.setState({ [key]: value }, () => {
      console.log(this.state);
    });
  };

  render() {
    const currentDate = this.state.date.toJSON().slice(0, 10);

    return (
      // convert tarot card input to searchable dropdown
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
            label="mood"
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
            changed={this.inputHander}
          />
          <Input
            controlId="tarotCard"
            label="Tarot Card"
            changed={this.inputHander}
          />

          <TarotCard name="Ace of Wands" />
          <Button variant="primary" type="submit">
            Select
          </Button>
          <Button variant="primary" type="submit">
            Upload
          </Button>

          <Textarea
            controlId="journalEntry"
            label="Journal Entry"
            as="textarea"
            rows="3"
          />

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default DailyDrawJournal;
