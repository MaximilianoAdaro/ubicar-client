import Grid from "@material-ui/core/Grid";
import styles from "./UserProfileMobile.module.scss";
import { Button, makeStyles, withStyles } from "@material-ui/core";
import {
  useGetLoggedUsingGET,
  useLogOut,
  useProfileUserUsingGET,
} from "../../api";
import { Link, useHistory } from "react-router-dom";
import { urls } from "../../constants";
import {
  AiFillEye,
  AiFillHeart,
  AiFillHome,
  CgProfile,
  RiArrowRightSLine,
  AiFillLike,
} from "react-icons/all";
import firebase from "firebase";
import HelpIcon from "@mui/icons-material/Help";
import { useQueryClient } from "react-query";

const useStyles = makeStyles({
  button: {
    justifyContent: "flex-start",
  },
});

const StyledButton = withStyles({
  root: {
    textTransform: "none",
    justifyContent: "left",
    fontWeight: "bold",
    width: "100%",
    "&:hover": {
      background: "#f2f2f2",
    },
  },
})(Button);

const LogOutButton = withStyles({
  root: {
    textTransform: "none",
    justifyContent: "center",
    fontWeight: "bold",
    marginTop: "3em",
    marginLeft: "15%",
    width: "70%",
    backgroundColor: "rgba(255,112,31,0.65)",
    border: "1px solid #ff4000",
  },
})(Button);

export function UserProfileMobile() {
  const { data: user } = useGetLoggedUsingGET();
  const { mutateAsync: logOut } = useLogOut();

  const history = useHistory();
  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logOut();
    await firebase.auth().signOut();
    history.push(urls.home);
  };

  if (!user) return <h4>Error</h4>;

  return (
    <Grid className={styles.user_profile_container}>
      <Grid className={styles.user_profile_title}>
        <h3 style={{ textAlign: "center", marginBottom: "1em" }}>Perfil</h3>
      </Grid>
      <Grid style={{ marginBottom: "1em" }}>
        <h4>Hola, {user.userName}</h4>
      </Grid>
      <Grid style={{ marginLeft: "0.5em", color: "grey", fontSize: "0.85em" }}>
        <span>Tu cuenta</span>
      </Grid>
      <Grid className={styles.user_profile_buttons_grid}>
        <Grid container className={styles.user_profile_buttons}>
          <Grid xs>
            <Link to={urls.userProfile.personalData}>
              <StyledButton>
                <CgProfile className={styles.user_profile_icons} />
                Datos Personales
              </StyledButton>
            </Link>
          </Grid>
          <Grid xs={1} className={styles.user_profile_arrow}>
            <RiArrowRightSLine />
          </Grid>
        </Grid>
        <Grid className={styles.user_profile_buttons} container>
          <Grid xs>
            <Link to={urls.userProfile.properties}>
              <StyledButton>
                <AiFillHome className={styles.user_profile_icons} />
                Mis Propiedades
              </StyledButton>
            </Link>
          </Grid>
          <Grid xs={1} className={styles.user_profile_arrow}>
            <RiArrowRightSLine />
          </Grid>
        </Grid>
        <Grid className={styles.user_profile_buttons} container>
          <Grid xs>
            <Link to={urls.userProfile.favorites}>
              <StyledButton>
                <AiFillHeart className={styles.user_profile_icons} />
                Mis Favoritos
              </StyledButton>
            </Link>
          </Grid>
          <Grid xs={1} className={styles.user_profile_arrow}>
            <RiArrowRightSLine />
          </Grid>
        </Grid>
        <Grid className={styles.user_profile_buttons} container>
          <Grid xs>
            <Link to={urls.userProfile.recentlyViewed}>
              <StyledButton>
                <AiFillEye className={styles.user_profile_icons} />
                Recientemente Vistos
              </StyledButton>
            </Link>
          </Grid>
          <Grid xs={1} className={styles.user_profile_arrow}>
            <RiArrowRightSLine />
          </Grid>
        </Grid>
        <Grid className={styles.user_profile_buttons} container>
          <Grid xs>
            <Link to={urls.userProfile.recommendations}>
              <StyledButton>
                <AiFillLike className={styles.user_profile_icons} />
                Recomendaciones
              </StyledButton>
            </Link>
          </Grid>
          <Grid xs={1} className={styles.user_profile_arrow}>
            <RiArrowRightSLine />
          </Grid>
        </Grid>
        {user && user.investor && (
          <Grid className={styles.user_profile_buttons} container>
            <Grid xs>
              <Link to={urls.userProfile.opportunities}>
                <StyledButton>
                  <AiFillEye className={styles.user_profile_icons} />
                  Oportunidades
                </StyledButton>
              </Link>
            </Grid>
            <Grid xs={1} className={styles.user_profile_arrow}>
              <RiArrowRightSLine />
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid className={styles.user_profile_help_grid}>
        <Grid>
          <p>Ayuda</p>
        </Grid>
        <Grid container>
          <HelpIcon />
          <p className={styles.user_profile_help_text}>Como funciona ubicar</p>
        </Grid>
        <Grid container>
          <HelpIcon />
          <p className={styles.user_profile_help_text}> Obtene ayuda</p>
        </Grid>
        <Grid container>
          <HelpIcon />
          <p className={styles.user_profile_help_text}> Ponte en contacto</p>
        </Grid>
      </Grid>
      <Grid>
        <LogOutButton onClick={handleLogout}>Cerrar Sesion</LogOutButton>
      </Grid>
    </Grid>
  );
}
