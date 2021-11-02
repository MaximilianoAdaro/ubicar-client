import Grid from "@material-ui/core/Grid";
import styles from "./UserProfileMobile.module.scss";
import {
  Button,
  LinearProgress,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { PersonalData } from "../../components/UserProfile";
import { useState } from "react";
import { createStyles, Theme } from "@material-ui/core/styles";
import { useGetLoggedUsingGET, useLogOut } from "../../api";
import { Link, useHistory } from "react-router-dom";
import { urls } from "../../constants";
import {
  AiFillEye,
  AiFillHeart,
  AiFillHome,
  CgProfile,
  RiArrowRightSLine,
} from "react-icons/all";
import firebase from "firebase";

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

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 5,
      borderRadius: 5,
      width: "100%",
    },
    colorPrimary: {
      backgroundColor: "grey",
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#FF701F",
    },
  })
)(LinearProgress);

export function UserProfileMobile() {
  const classes = useStyles();
  const [component, setComponent] = useState("PersonalData");
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
        <h3 style={{ textAlign: "center" }}>Perfil</h3>
      </Grid>
      <Grid style={{ marginBottom: "1em" }}>
        <h4>Hola, {user.userName}</h4>
      </Grid>
      <Grid style={{ marginLeft: "0.5em", color: "grey", fontSize: "0.85em" }}>
        <span>Tu cuenta</span>
      </Grid>
      <Grid>
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
      </Grid>
      <Grid>
        <LogOutButton onClick={handleLogout}>Cerrar Sesion</LogOutButton>
      </Grid>
    </Grid>
    // <>
    //   <div>
    //     <Grid className={styles.userProfileContainer}>
    //       <Grid className={styles.optionsContainer}>
    //         <Grid container>
    //           <Grid xs>
    //             <StyledButton
    //               className={classes.button}
    //               onClick={() => setComponent("PersonalData")}
    //               fullWidth
    //             >
    //               Datos Personales
    //             </StyledButton>
    //           </Grid>
    //           <Grid xs>
    //             <StyledButton
    //               className={classes.button}
    //               onClick={() => setComponent("MyProperties")}
    //               fullWidth
    //             >
    //               Mis Propiedades
    //             </StyledButton>
    //           </Grid>
    //           <Grid xs>
    //             <StyledButton
    //               className={classes.button}
    //               onClick={() => setComponent("MyFavorites")}
    //               fullWidth
    //             >
    //               Mis Favoritos
    //             </StyledButton>
    //           </Grid>
    //           <Grid xs>
    //             <StyledButton
    //               className={classes.button}
    //               onClick={() => setComponent("RecentlyViewed")}
    //               fullWidth
    //             >
    //               Recientemente Vistos
    //             </StyledButton>
    //           </Grid>
    //           <BorderLinearProgress variant="determinate" value={0} />
    //         </Grid>
    //       </Grid>
    //       <Grid xs className={styles.currentUserProfileComponent}>
    //         {component === "PersonalData" && <PersonalData />}
    //         {component === "MyFavorites" && <MyFavorites />}
    //         {component === "MyProperties" && <MyProperties />}
    //         {component === "RecentlyViewed" && <MyRecentlyViewed />}
    //       </Grid>
    //     </Grid>
    //   </div>
    // </>
  );
}
