import { Link, Route, Switch } from "react-router-dom";
import { CreateProperty, ListingPage, LogIn, SignUp } from "../routes";
import styles from "./App.module.scss";
import { ErrorPage } from "../components/ErrorPage";
import { Button } from "@material-ui/core";

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={WorkInProgress} />
      <Route exact path="/create-property" component={CreateProperty} />
      <Route exact path="/listing-page" component={ListingPage} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/log-in" component={LogIn} />
      <Route component={ErrorPage} />
    </Switch>
  );
}

const WorkInProgress = () => (
  <div className={styles.app}>
    <h1>App in progress...</h1>
    <br />
    <Link
      component={(props) => <Button variant={"outlined"} {...props} />}
      to={"/create-property"}
    >
      Crear publicacion
    </Link>
    <br />
    <Link
      component={(props) => <Button variant={"outlined"} {...props} />}
      to={"/sign-up"}
    >
      Registrarse
    </Link>
    <br />
    <Link
      component={(props) => <Button variant={"outlined"} {...props} />}
      to={"/log-in"}
    >
      Entrar
    </Link>
  </div>
);
