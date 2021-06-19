import { Button } from "@material-ui/core";
import firebase from "firebase";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { useLogOut } from "../api/auth";
import { useGetLoggedUsingGET } from "../api/generated/auth-controller/auth-controller";
import logo from "../assets/Logo-Ubicar.png";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "../components/common/protectedRoute/ProtectedRoute";
import { EditProperty } from "../components/editProperty/editProperty";
import { NavBar } from "../components/navbar/NavBar";
import { NotFound } from "../components/NotFound";
import { urls } from "../constants";
import {
  CreateProperty,
  ListingPage,
  LogIn,
  SignUp,
  UserProfile,
  ViewProperty,
} from "../routes";
import { actions, useAppDispatch, useAppSelector } from "../store";
import { selectRedirectPath } from "../store/slices/session";
import styles from "./App.module.scss";
import { Loading } from "../components/common/loading/Loading";

export default function App() {
  const redirectPath = useAppSelector(selectRedirectPath);
  const dispatch = useAppDispatch();

  const { data: user, isLoading } = useGetLoggedUsingGET();

  if (isLoading) return <Loading />;

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!user,
    authenticationPath: urls.logIn,
    redirectPath,
    setRedirectPath: (path) => dispatch(actions.session.setRedirectPath(path)),
  };

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path={urls.home} component={WorkInProgress} />
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          exact
          path={urls.createProperty}
          component={CreateProperty}
        />
        <Route exact path={urls.listingPage} component={ListingPage} />
        <Route exact path={urls.viewProperty.path} component={ViewProperty} />
        <Route exact path={urls.signUp} component={SignUp} />
        <Route exact path={urls.logIn} component={LogIn} />
        <Route exact path={urls.editProperty.path} component={EditProperty} />
        <Route exact path={"/loading"} component={Loading} />
        <Route exact path={"/userProfile"} component={UserProfile} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

const WorkInProgress = () => {
  const history = useHistory();

  const { data: user } = useGetLoggedUsingGET();
  const { mutateAsync: logOut } = useLogOut();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logOut();
    await firebase.auth().signOut();
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

        <br />

        <Link to={urls.createProperty}>
          <Button variant={"outlined"}>Crear publicacion</Button>
        </Link>

        <br />

        <Link to={urls.listingPage}>
          <Button variant={"outlined"}>Listar publicaciones</Button>
        </Link>
      </div>
    </div>
  );
};
