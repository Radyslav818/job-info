import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { JobInfo } from "./componets/jobInfo";
import { Joblist } from "./componets/joblist";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Joblist />
        </Route>
        <Route path="/jobInfo/:jobID">
          <JobInfo />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
