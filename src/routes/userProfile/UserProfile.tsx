import Grid from "@material-ui/core/Grid";
import styles from "./UserProfile.module.scss";
import {
  Button,
  LinearProgress,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { PersonalData } from "../../components/UserProfile";
import { MyFavorites } from "../../components/UserProfile/Web/MyFavorites";
import { MyProperties } from "../../components/UserProfile/Web/MyProperties";
import { useState } from "react";
import { createStyles, Theme } from "@material-ui/core/styles";
import { MyRecentlyViewed } from "../../components/UserProfile/Web/MyRecentlyViewed";
import { MyOpportunities } from "../../components/UserProfile/Web/MyOpportunities";
import {
  getGetLoggedUsingGETQueryKey,
  useGetLoggedUsingGET,
  useProfileUserUsingGET,
} from "../../api";
import { useQueryClient } from "react-query";

const useStyles = makeStyles({
  button: {
    justifyContent: "flex-start",
  },
});

const StyledButton = withStyles({
  root: {
    textTransform: "none",
    justifyContent: "center",
    fontWeight: "bold",
    "&:hover": {
      background: "#f2f2f2",
    },
    color: "#FF701F",
    fontSize: "x-large",
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

export function UserProfile() {
  const classes = useStyles();
  const [component, setComponent] = useState("PersonalData");
  const { data: user } = useGetLoggedUsingGET();
  return (
    <>
      <div>
        <Grid className={styles.userProfileContainer}>
          <Grid className={styles.optionsContainer}>
            <Grid container>
              <Grid xs>
                <StyledButton
                  className={classes.button}
                  onClick={() => setComponent("PersonalData")}
                  fullWidth
                >
                  Datos Personales
                </StyledButton>
              </Grid>
              <Grid xs>
                <StyledButton
                  className={classes.button}
                  onClick={() => setComponent("MyProperties")}
                  fullWidth
                >
                  Mis Propiedades
                </StyledButton>
              </Grid>
              <Grid xs>
                <StyledButton
                  className={classes.button}
                  onClick={() => setComponent("MyFavorites")}
                  fullWidth
                >
                  Mis Favoritos
                </StyledButton>
              </Grid>
              <Grid xs>
                <StyledButton
                  className={classes.button}
                  onClick={() => setComponent("RecentlyViewed")}
                  fullWidth
                >
                  Recientemente Vistos
                </StyledButton>
              </Grid>
              {user && user.investor && (
                <Grid xs>
                  <StyledButton
                    className={classes.button}
                    onClick={() => setComponent("Opportunities")}
                    fullWidth
                  >
                    Oportunidades
                  </StyledButton>
                </Grid>
              )}
              <BorderLinearProgress variant="determinate" value={0} />
            </Grid>
          </Grid>
          <Grid xs className={styles.currentUserProfileComponent}>
            {component === "PersonalData" && <PersonalData />}
            {component === "MyFavorites" && <MyFavorites />}
            {component === "MyProperties" && <MyProperties />}
            {component === "RecentlyViewed" && <MyRecentlyViewed />}
            {component === "Opportunities" && <MyOpportunities />}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
