import { Link, Route, Switch, useHistory } from "react-router-dom";
import { CreateProperty, ListingPage, LogIn, SignUp } from "../routes";
import styles from "./App.module.scss";
import { ErrorPage } from "../components/ErrorPage";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { urls } from "../constants";
import { actions, useAppDispatch, useAppSelector } from "../store";
import { selectSession } from "../store/slices/session";
import { useLoggedUser } from "../api/auth";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "../components/common/protectedRoute/ProtectedRoute";

export default function App() {
  const session = useAppSelector(selectSession);
  const dispatch = useAppDispatch();

  const { data: user, isLoading } = useLoggedUser();

  if (isLoading) return <span>Loading...</span>;
  if (user) dispatch(actions.session.setUser(user));

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: session.isAuthenticated,
    authenticationPath: urls.logIn,
    redirectPath: session.redirectPath,
    setRedirectPath: (path) => dispatch(actions.session.setRedirectPath(path)),
  };

  return (
    <Switch>
      <Route exact path={urls.home} component={WorkInProgress} />
      <ProtectedRoute
        {...defaultProtectedRouteProps}
        exact
        path={urls.createProperty}
        component={CreateProperty}
      />
      <Route exact path={urls.listingPage} component={ListingPage} />
      <Route exact path={urls.signUp} component={SignUp} />
      <Route exact path={urls.logIn} component={LogIn} />
      <Route component={ErrorPage} />
    </Switch>
  );
}

const WorkInProgress = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  // const { mutateAsync } = useLogOut();

  const handleLogut = async () => {
    // await mutateAsync();
    await firebase.auth().signOut();
    dispatch(actions.session.setUser(null));
    history.push(urls.home);
  };
  return (
    <div className={styles.app}>
      <h1>App in progress...</h1>
      <br />
      <Link
        component={(props) => <Button variant={"outlined"} {...props} />}
        to={urls.createProperty}
      >
        Crear publicacion
      </Link>
      <br />
      <Link
        component={(props) => <Button variant={"outlined"} {...props} />}
        to={urls.signUp}
      >
        Registrarse
      </Link>
      <br />
      <Link
        component={(props) => <Button variant={"outlined"} {...props} />}
        to={urls.logIn}
      >
        Entrar
      </Link>
      <br />
      <Button variant={"outlined"} onClick={handleLogut}>
        Log out
      </Button>
      <Link
        component={(props) => <Button variant={"outlined"} {...props} />}
        to={"/listing-page"}
      >
        Listing Page
      </Link>
    </div>
  );
};
