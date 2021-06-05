import { Button, Grid, List, ListItem, Popover } from "@material-ui/core";
import styles from "./NavBar.module.scss";
import React, { useState } from "react";

export function NavBar() {
  const [anchorAccount, setAnchorAccount] = useState(null);

  const openAccountPopover = (event: any) => {
    setAnchorAccount(event.currentTarget);
  };

  return (
    <div>
      <Grid container className={styles.navBarContainer}>
        <Grid xs container className={styles.navBarLogo}>
          <Grid xs>Ubicar</Grid>
        </Grid>
        <Grid xs={9} container className={styles.navBarOptions}>
          <Grid xs></Grid>
          <Grid xs={2}>
            <a href="https://www.google.com" className={styles.navBarTags}>
              Compra
            </a>
          </Grid>
          <Grid xs={2}>
            <a href="https://www.google.com" className={styles.navBarTags}>
              Alquiler
            </a>
          </Grid>
          <Grid xs={2}>
            <a href="https://www.google.com" className={styles.navBarTags}>
              Publicar
            </a>
          </Grid>
          <Grid xs></Grid>
        </Grid>
        <Grid xs className={styles.navBarAccount}>
          <div>
            <Button
              className={styles.filtersButton}
              id="buttonForm"
              size="small"
              onClick={openAccountPopover}
            >
              Mi cuenta
            </Button>
            <Popover
              open={Boolean(anchorAccount)}
              anchorEl={anchorAccount}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              onClose={() => setAnchorAccount(null)}
            >
              <List>
                <ListItem>Propiedades</ListItem>
                <ListItem>Favoritos</ListItem>
                <ListItem>Perfil</ListItem>
                <ListItem>Cerrar sesión</ListItem>
              </List>
            </Popover>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
