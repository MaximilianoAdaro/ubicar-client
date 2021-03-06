import {
  Button,
  Grid,
  List,
  ListItem,
  Popover,
  withStyles,
} from "@material-ui/core";
import styles from "./NavBar.module.scss";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/all";
import { Link, useHistory } from "react-router-dom";
import { urls } from "../../constants";
import firebase from "firebase";
import { useGetLoggedUsingGET, useLogOut } from "../../api";
import clsx from "clsx";

const StyledButton = withStyles({
  root: {
    background: "#297278",
    color: "white",
    textTransform: "none",
    border: "none",
    fontSize: "large",
    "&:hover": {
      background: "#297278",
    },
  },
})(Button);

export function NavBar() {
  const [anchorAccount, setAnchorAccount] = useState(null);

  const openAccountPopover = (event: any) => {
    setAnchorAccount(event.currentTarget);
  };

  const history = useHistory();

  const { data: user } = useGetLoggedUsingGET();
  const { mutateAsync: logOut } = useLogOut();

  const handleLogout = async (e: any) => {
    setAnchorAccount(null);
    e.preventDefault();
    await logOut();
    await firebase.auth().signOut();
    history.push(urls.home);
  };

  return (
    <div>
      <Grid container className={styles.navbar_container}>
        <Grid container xs>
          <Grid xs>
            <Link to={urls.listingPage} className={styles.navbar_links}>
              Ver Publicaciones
            </Link>
          </Grid>
          <Grid xs>
            <Link to={urls.createProperty} className={styles.navbar_links}>
              Publicar
            </Link>
          </Grid>
        </Grid>
        <Grid xs className={styles.navbar_logo}>
          <Link
            to={urls.home}
            className={clsx(styles.navbar_links, styles.navbar_title)}
          >
            Ubicar
          </Link>
        </Grid>
        <Grid xs className={styles.navbar_user_dropdown}>
          <div>
            {user ? (
              <div>
                <StyledButton
                  className={styles.navbar_user_dropdown_button}
                  id="buttonForm"
                  onClick={openAccountPopover}
                >
                  {user.userName}
                  <IoMdArrowDropdown
                    className={styles.navbar_user_dropdown_icon}
                  />
                </StyledButton>
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
                    <ListItem>
                      <Link
                        to={urls.userProfile.path}
                        className={styles.myAccountDropdownAccount}
                      >
                        Mi perfil
                      </Link>
                    </ListItem>
                    <ListItem
                      onClick={handleLogout}
                      className={styles.myAccountDropdownAccount}
                    >
                      Cerrar sesi??n
                    </ListItem>
                  </List>
                </Popover>
              </div>
            ) : (
              <Link to={urls.logIn} className={styles.navbar_links}>
                Iniciar Sesion
              </Link>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
