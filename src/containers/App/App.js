import React, { Component } from "react";
import styles from "./App.module.css";
import Layout from "../../hoc/Layout/Layout";
import DailyDrawJournal from "../DailyDrawJournal/DailyDrawJournal";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Layout />
        <DailyDrawJournal />
      </div>
    );
  }
}

export default App;
