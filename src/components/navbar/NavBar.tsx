import { Grid } from "@material-ui/core";
import styles from "./NavBar.module.scss";

export function NavBar() {
  return (
    <Grid container className={styles.navBarContainer}>
      <Grid xs container className={styles.navBarLogo}>
        {/*<Grid xs>*/}
        {/*  <img alt="UbicarLogo" src="UbicarLogo2.png" />*/}
        {/*</Grid>*/}
        <Grid xs>Ubicar</Grid>
      </Grid>
      <Grid xs={5} container className={styles.navBarOptions}>
        <Grid xs>Compra</Grid>
        <Grid xs>Renta</Grid>
        <Grid xs>Publicar</Grid>
        <Grid xs>Datos geoespaciales</Grid>
      </Grid>
      <Grid xs>
        <img
          alt='Profile'
          src="https://www.tekportal.net/wp-content/uploads/2019/02/f-1256.jpg"
          className={styles.navBarProfile}
        />
      </Grid>
    </Grid>
  );
}
