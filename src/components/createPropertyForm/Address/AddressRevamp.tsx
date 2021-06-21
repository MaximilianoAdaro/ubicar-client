import React, { useEffect, useRef, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { CustomForm } from "../../forms/customForm/CustomForm";
import { Container } from "react-bootstrap";
import { useCustomForm } from "../../../hooks/useCustomForm";
import { Step } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import { AddressFormData } from "./Address";
import { actions, useAppDispatch } from "../../../store";
import * as yup from "yup";
import { StepButtons } from "../StepButtons/StepButtons";
import styles from "./Address.module.scss";
import { MapComponent } from "../../Map/map";
import customInstance from "../../../api/mutator/custom-instance";
import { SecondParameter } from "../../../api/generated/auth-controller/auth-controller";
import { MapView } from "../../../store/slices/map/mapSlice";

type locationData = {
  number: number | null;
  address: string | null;
  locality: string | null;
  province: string | null;
  latitude: number | null;
  longitude: number | null;
};

export type getApiRequestParams = {
  direccion: string;
  provincia: string;
  departamento: string;
  localidad: string;
  max: number;
};

const getApiRequest = (
  url: string,
  params: {
    max: number;
    direccion: string;
    localidad: string | null;
    provincia: string | null;
  },
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<any>(
    { url: url, method: "get", params: params },
    // eslint-disable-next-line
    // @ts-ignore
    options
  );
};

export const AddressRevamp = () => {
  const [map, setMap] = useState(false);
  const [view, setView] = useState<MapView>();
  const mounted = useRef(false);
  const [data, setData] = useState<locationData>({
    number: null,
    address: null,
    locality: null,
    province: null,
    latitude: null,
    longitude: null,
  });
  const [load, setLoad] = useState(false);
  const zoom = 17;
  const dispatch = useAppDispatch();

  const requiredMessage = "Este campo es requerido";

  useEffect(() => {
    if (mounted.current) {
      const params = {
        direccion: data.address + " " + data.number,
        provincia: data.province,
        localidad: data.locality,
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
            latitude: response.direcciones[0].ubicacion.lat,
            longitude: response.direcciones[0].ubicacion.lon,
          });

          //Nose devuelve en 4326 lo tenemos que convertir 3857
          const convertCoordinates = (lon: number, lat: number) => {
            let x = (lon * 20037508.34) / 180;
            let y =
              Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) /
              (Math.PI / 180);
            y = (y * 20037508.34) / 180;
            return [x, y];
          };

          const coord = convertCoordinates(
            response.direcciones[0].ubicacion.lon,
            response.direcciones[0].ubicacion.lat
          );

          setView({ longitude: coord[0], latitude: coord[1] });
          setMap(true);
        })
        .catch(() => {
          setMap(false);
        });
    } else {
      mounted.current = true;
    }
  }, [load]);

  const schema = yup.object({
    city: yup.string().required(requiredMessage),
    street: yup.string().required(requiredMessage),
    number: yup.number().required(requiredMessage),
  });

  const customForm = useCustomForm<AddressFormData>({
    schema,
    onSubmit: (data) => {
      dispatch(actions.createPropertyForm.setAddress(data));
      dispatch(actions.createPropertyForm.setStep(Step.Characteristics));
    },
  });

  const handlePreviousButton = async () => {
    const isValid = await customForm.methods.trigger();
    if (isValid) {
      const data = customForm.methods.getValues();
      dispatch(actions.createPropertyForm.setAddress(data));
      dispatch(actions.createPropertyForm.setStep(Step.BasicInfo));
    }
  };

  return (
    <Container>
      <CustomForm {...customForm}>
        <Grid container>
          <Grid item xl={6} sm={6}>
            <div className={styles.input}>
              <span style={{ color: "black" }}>Provincia</span>
              <TextField
                fullWidth
                color="secondary"
                variant="outlined"
                onChange={(e) => setData({ ...data, province: e.target.value })}
              />
            </div>
            <div className={styles.input}>
              <span style={{ color: "black" }}>Localidad</span>
              <TextField
                fullWidth
                color="secondary"
                variant="outlined"
                onChange={(e) => setData({ ...data, locality: e.target.value })}
              />
            </div>
            <div className={styles.input}>
              <span style={{ color: "black" }}>Calle</span>
              <TextField
                fullWidth
                color="secondary"
                variant="outlined"
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            </div>
            <div className={styles.input}>
              <span style={{ color: "black" }}>Número</span>
              <TextField
                fullWidth
                color="secondary"
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
            {map && view ? (
              <MapComponent
                additionalStyle={{ height: "500px", width: "100%" }}
                renderLayers={false}
                zoom={zoom}
                view={view}
              />
            ) : null}
          </Grid>
        </Grid>
      </CustomForm>
      <StepButtons
        type={"submit"}
        onNext={() =>
          dispatch(actions.createPropertyForm.setStep(Step.Characteristics))
        }
        onPrevious={handlePreviousButton}
      />
    </Container>
  );
};
