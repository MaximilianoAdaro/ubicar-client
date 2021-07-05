import { Button, List, ListItem, makeStyles } from "@material-ui/core";
import styles from "../../routes/userProfile/UserProfile.module.scss";
import { useState } from "react";

const useStyles = makeStyles({
  button: {
    justifyContent: "flex-start",
  },
});

export function SectionButtons() {
  const classes = useStyles();
  const [component, setComponent] = useState("PersonalData");
  return (
    <>
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
    </>
  );
}
