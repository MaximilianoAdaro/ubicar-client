import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { CreateProperty } from "../routes";
import { Counter } from "../components/Counter";
import styles from "./App.module.scss";
import { Button } from "react-bootstrap";
import { ErrorPage } from "../components/ErrorPage";

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={WorkInProgress} />
      <Route exact path="/create-property" component={CreateProperty} />
      <Route component={ErrorPage} />
    </Switch>
  );
}

const WorkInProgress = () => (
  <div className={styles.app}>
    <h1>App in progress...</h1>
    <br />
    <Link component={Button} to={"/create-property"}>
      Crear publicacion
    </Link>
    <br />
    <br />
    <Counter />
  </div>
);
