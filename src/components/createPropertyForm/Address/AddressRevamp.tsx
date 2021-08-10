import React, { useEffect, useRef, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { Container } from "react-bootstrap";
import { Step } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import { actions, useAppDispatch } from "../../../store";
import { StepButtons } from "../StepButtons/StepButtons";
import styles from "./Address.module.scss";
import { MapComponent } from "../../Map/map";
import customInstance from "../../../api/mutator/custom-instance";
import { MapView } from "../../../store/slices/map/mapSlice";
import { transformFrom3857to4326 } from "../../Map/utils";
import { toast } from "react-toastify";

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

export type AddressFormData = {
  country: string;
  state: string;
  city: string;
  street: string;
  number: number | undefined;
  coordinates: CoordinatesDTO;
};

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

export const AddressRevamp = () => {
  const [zoom, setZoom] = useState(10);
  const [view, setView] = useState<MapView>({
    longitude: -6506056.858887733,
    latitude: -4114291.375798843,
  });
  const mounted = useRef(false);
  const [data, setData] = useState<AddressFormData>({
    country: "",
    state: "",
    city: "",
    street: "",
    number: undefined,
    coordinates: { lat: 0, long: 0 },
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
            country: "Argentina",
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
    dispatch(actions.createPropertyForm.setAddress(data));
    dispatch(actions.createPropertyForm.setStep(Step.BasicInfo));
  };

  const handleSubmit = () => {
    if (data.state !== "" && data.street !== "" && data.number !== undefined) {
      dispatch(actions.createPropertyForm.setAddress(data));
      dispatch(actions.createPropertyForm.setStep(Step.Characteristics));
    } else {
      throw Error;
    }
  };

  return (
    <Container>
      <form>
        <Grid container>
          <Grid item xl={6} sm={6}>
            <div className={styles.input}>
              <span style={{ color: "black" }}>Provincia</span>
              <TextField
                fullWidth
                color="secondary"
                value={data.state ? data.state : ""}
                variant="outlined"
                onChange={(e) => setData({ ...data, state: e.target.value })}
              />
            </div>
            <div className={styles.input}>
              <span style={{ color: "black" }}>Localidad</span>
              <TextField
                fullWidth
                color="secondary"
                value={data.city ? data.city : ""}
                variant="outlined"
                onChange={(e) => setData({ ...data, city: e.target.value })}
              />
            </div>
            <div className={styles.input}>
              <span style={{ color: "black" }}>Calle</span>
              <TextField
                fullWidth
                color="secondary"
                value={data.street ? data.street : ""}
                variant="outlined"
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
