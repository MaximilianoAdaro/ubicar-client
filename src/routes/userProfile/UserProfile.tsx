import Grid from "@material-ui/core/Grid";
import styles from "./UserProfile.module.scss";
import { Button, List, ListItem, makeStyles } from "@material-ui/core";
import { PersonalData } from "../../components/UserProfile";
import { MyFavorites } from "../../components/UserProfile/MyFavorites";
import { MyProperties } from "../../components/UserProfile/MyProperties";
import { Notifications } from "../../components/UserProfile/Notifications";
import { useState } from "react";

const useStyles = makeStyles({
  button: {
    justifyContent: "flex-start",
  },
});

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
                <Button
                  variant={"outlined"}
                  className={classes.button}
                  onClick={() => setComponent("PersonalData")}
                  fullWidth
                >
                  Datos Personales
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  variant={"outlined"}
                  className={classes.button}
                  onClick={() => setComponent("MyProperties")}
                  fullWidth
                >
                  Mis Propiedades
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  variant={"outlined"}
                  className={classes.button}
                  onClick={() => setComponent("MyFavorites")}
                  fullWidth
                >
                  Mis Favoritos
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  variant={"outlined"}
                  className={classes.button}
                  onClick={() => setComponent("Notifications")}
                  fullWidth
                >
                  Notificaciones
                </Button>
              </ListItem>
            </List>
          </Grid>
          <Grid xs>
            {component === "PersonalData" && <PersonalData></PersonalData>}
            {component === "MyFavorites" && <MyFavorites></MyFavorites>}
            {component === "MyProperties" && <MyProperties></MyProperties>}
            {component === "Notifications" && <Notifications></Notifications>}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
