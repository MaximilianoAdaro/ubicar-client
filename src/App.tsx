import React from "react";
import { Route, Switch } from "react-router-dom";
import { CreateProperty } from "./routes";

export default function App() {
  return (
    <Switch>
      <Route exact path="/create-property" component={CreateProperty} />
      <Route component={WorkInProgress} />
    </Switch>
  );
}

const WorkInProgress = () => (
  <div className="app">
    <h1>App in progress...</h1>
  </div>
);
