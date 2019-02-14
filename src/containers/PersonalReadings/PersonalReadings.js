import React from "react";
import { Route, Switch } from "react-router-dom";
import DailyDrawJournal from "../DailyDrawJournal/DailyDrawJournal";
import DailyDrawJournalDisplay from "../DailyDrawJournal/DailyDrawJournalDisplay/DailyDrawJournalDisplay";

const PersonalReadings = () => {
  return (
    <div>
      <Switch>
        <Route path="/createDailyDraw" component={DailyDrawJournal} />
        <Route path="/dailyDraws" component={DailyDrawJournalDisplay} />
      </Switch>
    </div>
  );
};

export default PersonalReadings;
