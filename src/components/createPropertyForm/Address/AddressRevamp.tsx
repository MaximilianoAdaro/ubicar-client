import React, { useEffect, useRef, useState } from "react";
import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import { Container } from "react-bootstrap";
import { Step } from "../../../store/slices/editPropertyForm/editPropertyFormSlice";
import { actions, useAppDispatch } from "../../../store";
import { StepButtons } from "../StepButtons/StepButtons";
import styles from "./Address.module.scss";
import { MapComponent } from "../../Map/map";
import customInstance from "../../../api/mutator/custom-instance";
import { MapView } from "../../../store/slices/map/mapSlice";
import { transformFrom3857to4326 } from "../../Map/utils";
import { toast } from "react-toastify";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AddressDTO } from "../../../api";

export type getApiRequestParams = {
  direccion: string;
  provincia: string;
  departamento: string;
  localidad: string;
  max: number;
};
export type CoordinatesDTO = {
  lat?: number;
  long?: number;
};

// export type AddressFormData = {
//   cityId: string;
//   stateId: string;
//   street: string;
//   number: number;
//   coordinates: CoordinatesDTO;
// };

const getApiRequest = (
  url: string,
  params: {
    max?: number;
    direccion?: string | null;
    localidad?: string | null;
    provincia?: string | null;
    lat?: number;
    lon?: number;
  }
) => {
  return customInstance<any>({ url: url, method: "get", params: params });
};

export const AddressRevamp = (address: AddressDTO) => {
  const [zoom, setZoom] = useState(10);
  const [view, setView] = useState<MapView>({
    longitude: -6506056.858887733,
    latitude: -4114291.375798843,
  });
  const mounted = useRef(false);
  const [data, setData] = useState({
    stateId: address.stateId,
    state: address.state,
    cityId: address.cityId,
    city: address.city,
    street: address.street,
    number: address.number,
    coordinates: {
      lat: address.coordinates.lat,
      long: address.coordinates.long,
    },
  });

  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [error, setError] = useState(true);
  const dispatch = useAppDispatch();

  const convertCoordinates = (lon: number, lat: number) => {
    let x = (lon * 20037508.34) / 180;
    let y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
    y = (y * 20037508.34) / 180;
    return [x, y];
  };

  const handleChangeClick = (lat: number, lon: number) => {
    if (!load2) {
      ////Nos devuelve en 3857 lo tenemos que convertir 4326
      setLoad2(true);
      const coord = transformFrom3857to4326([lon, lat]);

      //tenemos que hacer un reverse geocoding para verificar si esta en el mismo municipio que el geocoding original

      //https://apis.datos.gob.ar/georef/api/ubicacion?lat=-27.2741&lon=-66.7529

      const fun = async () => {
        const params = {
          lat: coord[1],
          lon: coord[0],
        };

        return await getApiRequest(
          "https://apis.datos.gob.ar/georef/api/ubicacion",
          params
        );
      };

      fun()
        .then((response) => {
          if (response.ubicacion.departamento.nombre === data.city) {
            //same localidad
            setView({ longitude: lon, latitude: lat });
            setData({
              ...data,
              coordinates: {
                long: coord[0],
                lat: coord[1],
              },
            });

            toast.success(" ✅ Ubicacion dentro del Rango!", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });

            //show box in bounds.
          } else {
            //Show box, wrong city
            toast.error(" ❌ Ubicacion fuera del Rango!", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            setError(true);
          }
          setLoad2(false);
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    if (mounted.current) {
      console.log(data);
      const params = {
        direccion: data.street + " " + (data.number ?? 0),
        provincia: data.state,
        localidad: data.city,
        max: 1,
      };

      const f = async () => {
        return await getApiRequest(
          "https://apis.datos.gob.ar/georef/api/direcciones",
          params
        );
      };

      f()
        .then((response) => {
          setData({
            ...data,
            coordinates: {
              lat: response.direcciones[0].ubicacion.lat,
              long: response.direcciones[0].ubicacion.lon,
            },
            state: response.direcciones[0].provincia.nombre,
            city: response.direcciones[0].departamento.nombre,
            street: response.direcciones[0].calle.nombre.toLowerCase(),
          });

          //Nos devuelve en 4326 lo tenemos que convertir 3857
          const coord = convertCoordinates(
            response.direcciones[0].ubicacion.lon,
            response.direcciones[0].ubicacion.lat
          );

          setView({ longitude: coord[0], latitude: coord[1] });
          setZoom(17);
          setError(false);
        })
        .catch(() => {});
    } else {
      mounted.current = true;
    }
  }, [load]);

  const handlePreviousButton = async () => {
    dispatch(actions.editPropertyForm.setAddress(data));
    dispatch(actions.editPropertyForm.setStep(Step.BasicInfo));
  };

  const handleSubmit = () => {
    if (data.state !== "" && data.street !== "" && data.number !== undefined) {
      dispatch(actions.editPropertyForm.setAddress(data));
      dispatch(actions.editPropertyForm.setStep(Step.Characteristics));
    } else {
      throw Error;
    }
  };

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([{ id: "", name: "" }]);
  const loading = open && options.length === 0;

  const onChangeHandle = async (value: any) => {
    const response = await fetch(
      "http://localhost:3000/public/states" + "?name=" + value
    );

    const countries = await response.json();
    if (countries) {
      setOptions(countries.content);
    }
  };

  const onChangeHandle2 = async (value: any) => {
    if (data.stateId) {
      const stateid = data.stateId;
      const response = await fetch(
        "http://localhost:3000/public/cities/" + stateid + "?name=" + value
      );

      const cities = await response.json();
      if (cities) {
        setOptions2(cities.content);
      }
    }
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const [open2, setOpen2] = useState(false);
  const [options2, setOptions2] = useState([{ id: "", name: "" }]);
  const loading2 = open2 && options2.length === 0;

  useEffect(() => {
    if (!open2) {
      setOptions2([]);
    }
  }, [open2]);

  const handleChange1 = (value: { name: string; id: string }) => {
    setData({ ...data, state: value.name, stateId: value.id });
  };
  const handleChange2 = (value: { name: string; id: string }) => {
    setData({ ...data, city: value.name, cityId: value.id });
  };

  return (
    <Container>
      <form autoComplete={"off"}>
        <Grid container>
          <Grid item xl={6} sm={6}>
            <div className={styles.input}>
              <span style={{ color: "black" }}>Provincia</span>
              <Autocomplete
                id="asyncState"
                open={open}
                onChange={(e, value) => {
                  if (value) {
                    handleChange1(value);
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
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
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
            <div className={styles.input}>
              <span style={{ color: "black" }}>Localidad</span>
              <Autocomplete
                id="asyncCity"
                open={open2}
                onChange={(e, value) => {
                  if (value) {
                    handleChange2(value);
                  }
                }}
                onOpen={() => {
                  setOpen2(true);
                }}
                onClose={() => {
                  setOpen2(false);
                }}
                getOptionSelected={(option, value) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                options={options2}
                loading={loading2}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    color={"secondary"}
                    onChange={(ev) => {
                      // dont fire API if the user delete or not entered anything
                      if (ev.target.value !== "" || ev.target.value !== null) {
                        onChangeHandle2(ev.target.value);
                      }
                    }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading2 ? (
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
            <div className={styles.input}>
              <span style={{ color: "black" }}>Calle</span>
              <TextField
                fullWidth
                color="secondary"
                // value={data.street ? data.street : ""}
                variant="outlined"
                autoComplete={"chrome-off"}
                onChange={(e) => setData({ ...data, street: e.target.value })}
              />
            </div>
            <div className={styles.input}>
              <span style={{ color: "black" }}>Número</span>
              <TextField
                fullWidth
                color="secondary"
                type="number"
                variant="outlined"
                onChange={(e) =>
                  setData({ ...data, number: parseInt(e.target.value) })
                }
              />
            </div>
            <div className={styles.input}>
              <Button
                className={styles.filtersButton}
                id="button"
                size="small"
                onClick={() => setLoad(!load)}
              >
                Buscar
              </Button>
            </div>
          </Grid>
          <Grid item xs={6} sm={6}>
            <MapComponent
              additionalStyle={{ height: "500px", width: "100%" }}
              renderLayers={false}
              zoom={zoom}
              view={view}
              handleChangeClick={handleChangeClick}
            />
          </Grid>
        </Grid>
      </form>
      <StepButtons
        type={"submit"}
        onNext={() => handleSubmit()}
        disabledNext={error}
        onPrevious={handlePreviousButton}
      />
    </Container>
  );
};
