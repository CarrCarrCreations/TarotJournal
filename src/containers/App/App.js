import React, { Component } from "react";
import styles from "./App.module.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "../../hoc/Layout/Layout";
import DailyDrawJournal from "../DailyDrawJournal/DailyDrawJournal";
import Dashboard from "../Dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={styles.App}>
          <Layout />
          <Dashboard />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
