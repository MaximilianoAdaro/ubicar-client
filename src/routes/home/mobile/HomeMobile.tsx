import { useHistory, useParams } from "react-router-dom";
import styles from "./HomeMobile.module.scss";
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { useState } from "react";
import { useGetLoggedUsingGET } from "../../../api";
import React from "react";
import background from "../img/background.png";
import background1 from "../img/my_background.jpg";
import backgroundMobile from "../img/backgroundMobile.png";
import { actions, useAppDispatch } from "../../../store";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { convertCoordinates } from "../../../components/Map/utils";
import {
  MostLikedMobile,
  RecentlyViewedMobile,
} from "../../../components/homePage";

export const HomeMobile = () => {
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
    <div>
      <div className={styles.app}>
        <div className={styles.texts}>
          <div className={styles.left}>
            <div className={styles.header}>
              <span className={styles.title}>Ubicar</span>
              <span className={styles.subtitle}>
                Encontrá tu propiedad ideal
              </span>
            </div>
            <div className={styles.searchOutside}>
              <Autocomplete
                id="asyncState"
                size={"small"}
                className={styles.searchAutocomplete}
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
                getOptionSelected={(option, value) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => handleOptionLabel(option)}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={styles.search}
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
            <div className={styles.description}>
              En Ubicar vas a poder encontrar inmuebles en venta y alquiler.
              Además contamos con la información geoespacial de cada zona para
              asegurarte de que siempre estes eligiendo la mejor alternativa.
            </div>
          </div>
        </div>
      </div>
      <div className={styles.properties} />

      {user ? <RecentlyViewedMobile /> : <MostLikedMobile />}
    </div>
  );
};
