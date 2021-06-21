import styles from "./Footer.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";

export function Footer() {
  return (
    <div
      style={{
        marginTop: "3vh",
      }}
    >
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
          <Grid className={styles.footerOptionsGrid}>
            <a className={styles.footerOptionsATag}>Publicar propiedad</a>
          </Grid>
          <Grid className={styles.footerOptionsGrid}>
            <a className={styles.footerOptionsATag}>Comprar propiedad</a>
          </Grid>
          <Grid className={styles.footerOptionsGrid}>
            <a className={styles.footerOptionsATag}>Alquilar propiedad</a>
          </Grid>
          <Grid className={styles.footerOptionsGrid}>
            <a className={styles.footerOptionsATag}>Publicar propiedad</a>
          </Grid>
          <Grid className={styles.footerOptionsGrid}>
            <a className={styles.footerOptionsATag}>Mi cuenta</a>
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
          <Grid className={styles.socialMediaLinks}>
            <Grid className={styles.socialMediaText}>
              Puedes seguirnos en las siguientes redes sociales:
            </Grid>
            <Grid container>
              <Grid xl={1} xs={2}>
                <img
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  }
                  alt={"FBlogo"}
                />
              </Grid>
              <Grid xl={1} xs={2}>
                <img
                  src={
                    "https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2019/12/twitter-logo.jpg"
                  }
                  alt={"TWlogo"}
                />
              </Grid>
              <Grid xl={1} xs={2}>
                <img
                  src={
                    "https://play-lh.googleusercontent.com/h9jWMwqb-h9hjP4THqrJ50eIwPekjv7QPmTpA85gFQ10PjV02CoGAcYLLptqd19Sa1iJ"
                  }
                  alt={"INSTlogo"}
                />
              </Grid>
              <Grid xl={1} xs={2}>
                <img
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/YouTube_social_white_square_%282017%29.svg/1024px-YouTube_social_white_square_%282017%29.svg.png"
                  }
                  alt={"YTlogo"}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
