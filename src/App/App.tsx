import { Route, Switch } from "react-router-dom";
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
import { Loading } from "../components/common/loading/Loading";
import { EditProperty } from "../routes/editProperty";
import { Footer } from "../components/footer/Footer";
import { useGetLoggedUsingGET } from "../api";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from "react";
import { Home } from "../routes/home/Home";

export default function App() {
  const redirectPath = useAppSelector(selectRedirectPath);
  const dispatch = useAppDispatch();

  const { data: user, isLoading } = useGetLoggedUsingGET();

  const location = useLocation();

  if (isLoading) return <Loading />;

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!user,
    authenticationPath: urls.logIn,
    redirectPath,
    setRedirectPath: (path) => dispatch(actions.session.setRedirectPath(path)),
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <NavBar />
      <div
        style={{
          minHeight: "71vh",
        }}
      >
        <Switch>
          <Route exact path={urls.home} component={Home} />
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
          <Route exact path={urls.userProfile} component={UserProfile} />
          <Route component={NotFound} />
        </Switch>
      </div>
      {location.pathname !== "/listing-page" && <Footer />}
    </>
  );
}
