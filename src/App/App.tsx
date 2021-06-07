import { Link, Route, Switch, useHistory } from "react-router-dom";
import { CreateProperty, ListingPage, LogIn, SignUp } from "../routes";
import styles from "./App.module.scss";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { urls } from "../constants";
import { actions, useAppDispatch, useAppSelector } from "../store";
import { selectSession } from "../store/slices/session";
import { useLoggedUser, useLogOut } from "../api/auth";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "../components/common/protectedRoute/ProtectedRoute";
import { NotFound } from "../components/NotFound";
import logo from "../assets/Logo-Ubicar.png";
import { EditProperty } from "../components/editProperty/editProperty";

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
    <>
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
        <Route exact path={"/editProp"} component={EditProperty} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

const WorkInProgress = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { data: user } = useLoggedUser();

  const { mutateAsync: logOut } = useLogOut();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    console.log("signing out");
    await logOut();
    await firebase.auth().signOut();
    dispatch(actions.session.setUser(null));
    console.log("dispatched user null");
    history.push(urls.home);
  };
  return (
    <div className={styles.app}>
      {user && (
        <div
          style={{
            marginBottom: 20,
          }}
        >
          <h4>Bienvenido {user.userName}</h4>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <img src={logo} height={90} alt={"logo"} />
        <h1>Ubicar in progress...</h1>
      </div>
      <br />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to={urls.createProperty}>
          <Button variant={"outlined"}>Crear publicacion</Button>
        </Link>

        <br />

        <Link to={urls.listingPage}>
          <Button variant={"outlined"}>Listar publicaciones</Button>
        </Link>

        <br />

        <Link to={"/editProp"}>
          <Button>Edit</Button>
        </Link>

        {!user ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link to={urls.signUp}>
              <Button variant={"outlined"}>Registrarse</Button>
            </Link>
            <div style={{ height: 24 }} />
            <Link to={urls.logIn}>
              <Button variant={"outlined"}>Iniciar sesión</Button>
            </Link>
          </div>
        ) : (
          <Button variant={"outlined"} onClick={handleLogout}>
            Cerrar sesión
          </Button>
        )}
      </div>
    </div>
  );
};
