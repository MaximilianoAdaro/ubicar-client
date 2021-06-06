import { Button, Grid, List, ListItem, Popover } from "@material-ui/core";
import styles from "./NavBar.module.scss";
import React, { useState } from "react";
import logo from "./Logo/Logo-Ubicar.png";
import { Image } from "react-bootstrap";

export function NavBar() {
  const [anchorAccount, setAnchorAccount] = useState(null);

  const openAccountPopover = (event: any) => {
    setAnchorAccount(event.currentTarget);
  };

  return (
    <div>
      <Grid container className={styles.navBarContainer}>
        <Grid container xs>
          <Grid xs={4} className={styles.navBarLogo} container>
            <Image src={logo} alt="Logo Ubicar" className={styles.imageLogo} />
            <p>Ubicar</p>
          </Grid>
          <Grid xs></Grid>
        </Grid>
        <Grid xs>
          <Grid container className={styles.faker}>
            <Grid xs></Grid>
            <Grid xs={3} xl={2} className={styles.gridTags}>
              <a href="https://www.google.com" className={styles.navBarTags}>
                Compra
              </a>
            </Grid>
            <Grid xs={3} xl={2} className={styles.gridTags}>
              <a href="https://www.google.com" className={styles.navBarTags}>
                Alquiler
              </a>
            </Grid>
            <Grid xs={3} xl={2} className={styles.gridTags}>
              <a href="https://www.google.com" className={styles.navBarTags}>
                Publicar
              </a>
            </Grid>
            <Grid xs={3} xl={2} className={styles.navBar2Account}>
              <div>
                <Button
                  className={styles.myAccountButton}
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
        </Grid>
      </Grid>
    </div>
  );
}
