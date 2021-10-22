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
import styles from "./App.module.scss";
import { Loading } from "../components/common/loading/Loading";
import { EditProperty } from "../routes/editProperty";
import { Footer } from "../components/footer/Footer";
import { useGetLoggedUsingGET } from "../api";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CircularProgress, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router-dom";
import { convertCoordinates } from "../components/Map/utils";
import { useWindowSize } from "../hooks/useWindowSize";
import { ListingPageMobile } from "../routes/listingPage/ListingPageMobile";

export default function App() {
  const redirectPath = useAppSelector(selectRedirectPath);
  const dispatch = useAppDispatch();

  const size = useWindowSize();

  const { data: user, isLoading } = useGetLoggedUsingGET();

  const location = useLocation();

  if (isLoading) return <Loading />;

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!user,
    authenticationPath: urls.logIn,
    redirectPath,
    setRedirectPath: (path) => dispatch(actions.session.setRedirectPath(path)),
  };

  if ((size.width ?? 0) < 770)
    return (
      <>
        <Switch>
          <Route exact path={urls.listingPage} component={ListingPageMobile} />
          <Route component={NotFound} />
        </Switch>
      </>
    );

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
          <Route exact path={urls.userProfile} component={UserProfile} />
          <Route component={NotFound} />
        </Switch>
      </div>
      {location.pathname !== "/listing-page" && <Footer />}
    </>
  );
}

const WorkInProgress = () => {
  const { data: user } = useGetLoggedUsingGET();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([
    { id: "", name: "", stateName: "", centroid: { lat: 0, long: 0 } },
  ]);
  const loading = open && options.length === 0;

  const onChangeHandle = async (value: any) => {
    const response = await fetch(
      "http://localhost:3000/public/cities-and-states?name=" + value
    );

    const citiesAndStates = await response.json();
    if (citiesAndStates && citiesAndStates.content) {
      const options = citiesAndStates.content.map((option: any) => {
        if (option.type === "STATE") {
          return option.state;
        } else {
          return option.city;
        }
      });
      setOptions(options);
    }
  };

  const handleChangeView = (longitude: number, latitude: number) => {
    dispatch(actions.map.setView({ longitude: longitude, latitude: latitude }));
    dispatch(actions.map.setZoom(12));
  };
  const handleChangeName = (name: string) => {
    dispatch(actions.session.setSearchBar(name));
  };

  const handleOptionLabel = (option: any) => {
    if (option.id !== "") {
      if (option.stateName)
        return (
          option.name[0].toUpperCase() +
          option.name.substr(1).toLowerCase() +
          ", " +
          option.stateName
        );
      return option.name[0].toUpperCase() + option.name.substr(1).toLowerCase();
    }
    return "";
  };

  const handleOption = (value: any) => {
    dispatch(actions.session.setOption(value));
    history.push("/listing-page");
  };

  return (
    <div className={styles.app}>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        {user && <h4>Bienvenido {user.userName}</h4>}

        <div style={{ margin: "auto" }}>
          <Autocomplete
            id="asyncState"
            style={{ width: "500px" }}
            open={open}
            onChange={(e, value) => {
              if (value) {
                let coords = convertCoordinates(
                  value.centroid.long,
                  value.centroid.lat
                );
                handleChangeName(handleOptionLabel(value));
                handleChangeView(coords[0], coords[1]);
                handleOption(value);
              }
            }}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => handleOptionLabel(option)}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label={"Introduzca una dirección!"}
                variant="outlined"
                color={"secondary"}
                onChange={(ev) => {
                  // dont fire API if the user delete or not entered anything
                  if (ev.target.value !== "" || ev.target.value !== null) {
                    onChangeHandle(ev.target.value);
                  }
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
