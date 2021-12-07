import { useHistory } from "react-router-dom";
import styles from "./Home.module.scss";
import { CircularProgress, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useGetLoggedUsingGET } from "../../api";
import background1 from "./img/my_background.jpg";
import { actions, useAppDispatch } from "../../store";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { convertCoordinates } from "../../components/Map/utils";
import { MostLiked, RecentlyViewed } from "../../components/homePage";

export const Home = () => {
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
      <div
        className={styles.app}
        style={{ backgroundImage: `url(${background1})` }}
      >
        <div className={styles.texts}>
          <div className={styles.left}>
            <Typography
              style={{
                fontWeight: "bold",
                color: "#d2d2d2",
                fontSize: "7.5rem",
                textAlign: "left",
                width: "100%",
                marginLeft: "100px",
              }}
            >
              Ubicar
            </Typography>
            <Typography
              style={{
                fontWeight: "bold",
                color: "#FF701F",
                fontSize: "4rem",
                textAlign: "left",
                width: "100%",
                marginLeft: "100px",
              }}
            >
              Encontrá tu propiedad ideal
            </Typography>
            <div className={styles.searchOutside}>
              <Autocomplete
                id="asyncState"
                style={{ width: "500px", backgroundColor: "#ffffff" }}
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
      </div>
      <div className={styles.properties} />

      {user ? (
        <RecentlyViewed
          title={"Propiedades recientemente vistas"}
          numberOfHouses={10}
        />
      ) : (
        <MostLiked />
      )}
      {user && (
        <RecentlyViewed
          title={"Por que te gusto x te recomendamos:"}
          numberOfHouses={5}
        />
      )}
      {/*{user && <RecentlyViewed title={"Por que te gusto x te recomendamos:"} numberOfHouses={5} />}*/}
      {/*{user && <RecentlyViewed title={"Por que te gusto x te recomendamos:"} numberOfHouses={5} />}*/}
    </div>
  );
};
