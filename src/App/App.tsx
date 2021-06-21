import { Button } from "@material-ui/core";
import firebase from "firebase";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { useLogOut } from "../api/auth";
import { useGetLoggedUsingGET } from "../api/generated/auth-controller/auth-controller";
import logo from "../assets/Logo-Ubicar.png";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "../components/common/protectedRoute/ProtectedRoute";
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
import { EditProperty } from "../routes/editProperty";
import { Footer } from "../components/footer/Footer";

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
      <Footer />
    </>
  );
}

const WorkInProgress = () => {
  const { data: user } = useGetLoggedUsingGET();

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
    </div>
  );
};
