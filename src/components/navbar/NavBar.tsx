import { Grid, List, ListItem, Popover } from "@material-ui/core";
import styles from "./NavBar.module.scss";
import { useState } from "react";
import logo from "./Logo/Logo-Ubicar.png";
import { Image } from "react-bootstrap";
import { IoMdArrowDropdown } from "react-icons/all";
import { Link } from "react-router-dom";
import { urls } from "../../constants";

export function NavBar() {
  const [anchorAccount, setAnchorAccount] = useState(null);

  const openAccountPopover = (event: any) => {
    setAnchorAccount(event.currentTarget);
  };

  return (
    <div className={styles.divNavBarContainer}>
      <Grid container className={styles.navBarContainer}>
        <Grid item xs>
          <Grid item xs={4} className={styles.navBarLogo} container>
            <Image src={logo} alt="Logo Ubicar" className={styles.imageLogo} />
            <p>
              <Link to={urls.home}>Ubicar</Link>
            </p>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <Grid item xs>
          <Grid container className={styles.faker}>
            <Grid item xs></Grid>
            <Grid item xs={3} xl={2} className={styles.gridTags}>
              <Link to={urls.listingPage} className={styles.navBarTags}>
                Compra
              </Link>
            </Grid>
            <Grid item xs={3} xl={2} className={styles.gridTags}>
              <Link to={urls.listingPage} className={styles.navBarTags}>
                Alquiler
              </Link>
            </Grid>
            <Grid item xs={3} xl={2} className={styles.gridTags}>
              <Link to={urls.createProperty} className={styles.navBarTags}>
                Publicar
              </Link>
            </Grid>
            <Grid item xs={3} xl={2} className={styles.navBarAccount}>
              <div>
                <button
                  className={styles.myAccountButton}
                  id="buttonForm"
                  onClick={openAccountPopover}
                >
                  Mi cuenta
                  <IoMdArrowDropdown className={styles.myAccountDropdownIcon} />
                </button>
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
