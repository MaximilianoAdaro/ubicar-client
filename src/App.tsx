import React from "react";
import { Typography } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import CreateProperty from "./pages/CreateProperty";

function App() {
  return (
    <Switch>
      <Route exact path="/create-property" component={CreateProperty} />
      <Route component={WorkInProgress} />
    </Switch>
  );
}

export default App;

function WorkInProgress() {
  return <Typography>Work in progress!</Typography>;
}
