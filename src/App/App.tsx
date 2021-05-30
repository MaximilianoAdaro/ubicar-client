import React from "react";
import { Route, Switch } from "react-router-dom";
import { ListingPage } from "../routes";
import { Counter } from "../components/Counter";
import styles from "./App.module.scss";
import { ErrorPage } from "../components/ErrorPage";

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={WorkInProgress} />
      <Route path='/listing-page' component={ListingPage}/>
      <Route component={ErrorPage} />
    </Switch>
  );
}

const WorkInProgress = () => (
  <div className={styles.app}>
    <h1>App in progress...</h1>
    <br />
    <br />
    <br />
    <Counter />
  </div>
);
