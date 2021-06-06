import styles from "./Footer.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";

export function Footer() {
  return (
    <div>
      <Grid container className={styles.footerContainer}>
        <Grid xs={4} className={styles.footerUbicar}>
          <Grid>
            <h4>Ubicar</h4>
          </Grid>
          <Grid>
            <p>
              En Ubicar vas a poder encontrar inmuebles en venta y alquiler.
              Además contamos con la informacion geoespacial de cada zona para
              asegurarte de siempre estes eligiendo la mejor alternativa.{" "}
            </p>
          </Grid>
        </Grid>
        <Grid xs={1}></Grid>
        <Grid xs={2} className={styles.footerOptions}>
          <Grid>
            <h4>Mapa de sitio</h4>
          </Grid>
          <Grid>
            <p>Publicar propiedad</p>
          </Grid>
          <Grid>
            <p>Comprar propiedad</p>
          </Grid>
          <Grid>
            <p>Alquilar propiedad</p>
          </Grid>
          <Grid>
            <p>Publicar propiedad</p>
          </Grid>
          <Grid>
            <p>Mi cuenta</p>
          </Grid>
        </Grid>
        <Grid xs={2}></Grid>
        <Grid xs className={styles.footerContact}>
          <Grid>
            <h4>Contacto</h4>
          </Grid>
          <Grid>
            <p>
              Por cualquier consulta, se puede comunicar al email
              info@ubicar.com.ar.
            </p>
          </Grid>
          <Grid container>
            <Grid xs={1}>FB</Grid>
            <Grid xs={1}>TW</Grid>
            <Grid xs={1}>YT</Grid>
            <Grid xs={1}>INST</Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
