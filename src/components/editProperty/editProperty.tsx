import styles from "./editProperty.module.scss";
import React from "react";
import { Form } from "react-bootstrap";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  StylesProvider,
  TextField,
} from "@material-ui/core";

export function EditProperty() {
  return (
    <StylesProvider injectFirst>
      <div>
        <Form>
          <Grid className={styles.formContainer}>
            <h1 className={styles.formTitle}>Editar Propiedad</h1>
            <TextField
              label="Titulo"
              placeholder=""
              InputLabelProps={{ shrink: true }}
              variant={"outlined"}
              className={styles.title}
              fullWidth
            />
            <Grid container>
              <TextField
                label="Precio"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.price}
              />
              <TextField
                label="Expensas"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.expensas}
              />
            </Grid>
            <Grid className={styles.tipodecasa}>
              <InputLabel id="demo-simple-select-label">
                Tipo de casa
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={"Casa"}
                fullWidth
              >
                <MenuItem value={"Casa"}>Casa</MenuItem>
                <MenuItem value={20}>Departamento</MenuItem>
                <MenuItem value={30}>Quinta</MenuItem>
              </Select>
            </Grid>
            <Grid className={styles.location}>
              {/*<Select value={""}>*/}
              {/*  <MenuItem value={"Argentina"}>Argentina</MenuItem>*/}
              {/*</Select>*/}
              <TextField
                label="Pais"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
              <TextField
                label="Provincia"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
              <TextField
                label="Ciudad"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
              <TextField
                label="Barrio"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
            </Grid>
            <Grid>
              <TextField
                label="Codigo Postal"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
              <TextField
                label="Calle"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
              <TextField
                label="Numero"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
              <TextField
                label="Departamento"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
            </Grid>
            <Grid>
              <TextField
                label="Superficie Total"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
              <TextField
                label="Superficie Cubierta"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
            </Grid>
            <Grid>
              <TextField
                label="Cantidad de Ambientes"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
              <TextField
                label="Cantidad de habitaciones"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
              <TextField
                label="Baños completos"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
              <TextField
                label="Toilettes"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
            </Grid>
            <Grid>
              <TextField
                label="Cantidad de pisos"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
              <TextField
                label="Año de construcción"
                placeholder=""
                InputLabelProps={{ shrink: true }}
                variant={"outlined"}
                className={styles.pais}
              />
            </Grid>
            <Grid>
              <Grid>Servicios</Grid>
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Balcon"
              />
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Baulera"
              />
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Cocina"
              />
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Lavadero"
              />
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Patio"
              />
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Calefaccion"
              />
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Sauna"
              />
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Quincho"
              />
            </Grid>
            <Grid>
              <Grid>Medidas de seguridad</Grid>
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Rejas"
              />
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Camaras"
              />
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Alarma de entrada"
              />
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Alarma de humo"
              />
            </Grid>
            <Grid>
              <Grid>Materiales de construccion</Grid>
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Ladrillo"
              />
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Cemento"
              />
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Piedra"
              />
              <FormControlLabel
                control={<Checkbox name="checkedG" />}
                label="Chapa"
              />
            </Grid>
            <Button variant={"outlined"}>Submit</Button>
          </Grid>
        </Form>
      </div>
    </StylesProvider>
  );
}
