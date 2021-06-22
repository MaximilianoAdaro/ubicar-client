import Grid from "@material-ui/core/Grid";
import styles from "./UserProfile.module.scss";
import {
  Button,
  List,
  ListItem,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { PersonalData } from "../../components/UserProfile";
import { MyFavorites } from "../../components/UserProfile/MyFavorites";
import { MyProperties } from "../../components/UserProfile/MyProperties";
import { useState } from "react";

const useStyles = makeStyles({
  button: {
    justifyContent: "flex-start",
  },
});

const StyledButton = withStyles({
  root: {
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": {
      background: "#f2f2f2",
    },
  },
})(Button);

export function UserProfile() {
  const classes = useStyles();
  const [component, setComponent] = useState("PersonalData");
  return (
    <>
      <div>
        <Grid container>
          <Grid xs={2} className={styles.optionsContainer}>
            <List className={styles.optionsList}>
              <ListItem>
                <StyledButton
                  variant={"outlined"}
                  className={classes.button}
                  onClick={() => setComponent("PersonalData")}
                  fullWidth
                >
                  Datos Personales
                </StyledButton>
              </ListItem>
              <ListItem>
                <StyledButton
                  variant={"outlined"}
                  className={classes.button}
                  onClick={() => setComponent("MyProperties")}
                  fullWidth
                >
                  Mis Propiedades
                </StyledButton>
              </ListItem>
              <ListItem>
                <StyledButton
                  variant={"outlined"}
                  className={classes.button}
                  onClick={() => setComponent("MyFavorites")}
                  fullWidth
                >
                  Mis Favoritos
                </StyledButton>
              </ListItem>
              {/*<ListItem>*/}
              {/*  <Button*/}
              {/*    variant={"outlined"}*/}
              {/*    className={classes.button}*/}
              {/*    onClick={() => setComponent("Notifications")}*/}
              {/*    fullWidth*/}
              {/*  >*/}
              {/*    Notificaciones*/}
              {/*  </Button>*/}
              {/*</ListItem>*/}
            </List>
          </Grid>
          <Grid xs>
            {component === "PersonalData" && <PersonalData />}
            {component === "MyFavorites" && <MyFavorites />}
            {component === "MyProperties" && <MyProperties />}
            {/*{component === "Notifications" && <Notifications />}*/}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
