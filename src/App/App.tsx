import { Link, Route, Switch, useHistory } from "react-router-dom";
import { CreateProperty, ListingPage, LogIn, SignUp } from "../routes";
import styles from "./App.module.scss";
import { ErrorPage } from "../components/ErrorPage";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { urls } from "../constants";
import { actions, useAppDispatch, useAppSelector } from "../store";
import { selectSession } from "../store/slices/session";
import { useLoggedUser, useLogOut } from "../api/auth";
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

  const { mutateAsync: logOut } = useLogOut();

  const handleLogout = async () => {
    await logOut();
    await firebase.auth().signOut();
    dispatch(actions.session.setUser(null));
    history.push(urls.home);
  };
  return (
    <div className={styles.app}>
      <h1>App in progress...</h1>
      <br />

      <Link to={urls.createProperty}>
        <Button variant={"outlined"}>Crear publicacion</Button>
      </Link>

      <br />

      <Link to={urls.signUp}>
        <Button variant={"outlined"}>Registrarse</Button>
      </Link>

      <br />

      <Link to={urls.logIn}>
        <Button variant={"outlined"}>Entrar</Button>
      </Link>

      <br />

      <Button variant={"outlined"} onClick={handleLogout}>
        Log out
      </Button>

      <br />

      <Link to={urls.listingPage}>
        <Button variant={"outlined"}>Listing Page</Button>
      </Link>
    </div>
  );
};
