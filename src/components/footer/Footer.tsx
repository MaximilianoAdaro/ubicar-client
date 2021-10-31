import styles from "./Footer.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { urls } from "../../constants";

export function Footer() {
  return (
    <div>
      <Grid container className={styles.footer_container}>
        <Grid xs className={styles.footer_information}>
          <h3 className={styles.footer_navigation_title}>Contacto</h3>
          <p style={{ margin: "0", lineHeight: "1.25em" }}>
            Puede contactarnos al email ubicar.austral2021@gmail.com para
            cualquier consulta
          </p>
        </Grid>
        <Grid xs={2} />
        <Grid xs>
          <h3 className={styles.footer_navigation_title}>Ubicar</h3>
          <Grid className={styles.footer_navigation_links}>
            <Link
              to={urls.createProperty}
              className={styles.footer_navigation_links_style}
            >
              Publicar propiedad
            </Link>
          </Grid>
          <Grid className={styles.footer_navigation_links}>
            <Link
              to={urls.listingPage}
              className={styles.footer_navigation_links_style}
            >
              Propiedades Argentina
            </Link>
          </Grid>
          <Grid className={styles.footer_navigation_links}>
            <Link
              to={urls.userProfile}
              className={styles.footer_navigation_links_style}
            >
              Mi cuenta
            </Link>
          </Grid>
        </Grid>
        <Grid xs={2} />
        <Grid xs className={styles.footer_about_us}>
          <Grid className={styles.about_us_element}>Ayuda</Grid>
          <Grid className={styles.about_us_element}>Sobre Nosotros</Grid>
        </Grid>
      </Grid>
    </div>
  );
}
