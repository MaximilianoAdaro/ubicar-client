import styles from "./UserProfile.module.scss";
import React from "react";
import { Grid, List, ListItem, TextField } from "@material-ui/core";
import { useGetLoggedUsingGET } from "../../api";

export function PersonalData() {
  // const [emailChangeButton, setEmailChangeButton] = useState(true);
  // const [passwordChangeButton, setPasswordChangeButton] = useState(true);
  // const [nameChangeButton, setNameChangeButton] = useState(true);
  // const [cellphoneChangeButton, setCellphoneChangeButton] = useState(true);
  // const [phoneChangeButton, setPhoneChangeButton] = useState(true);
  const { data: user } = useGetLoggedUsingGET();

  if (!user) return <h4>Error</h4>;

  return (
    <div
      className={styles.personalDataMainDiv}
      style={{
        height: "80vh",
      }}
    >
      <Grid className={styles.personalDataTitle}>
        <h1>Datos</h1>
        <p>
          Puedes cambiar tus datos personales o agregar algunos para que podamos
          comunicarnos con usted.
        </p>
      </Grid>
      <Grid container className={styles.personalDataInformation}>
        <Grid xs>
          <h3>Personales</h3>
          <List>
            <ListItem>
              <TextField
                label="Nombre"
                variant="outlined"
                value={user.userName}
                size={"small"}
                fullWidth
                disabled
              />
              {/*<Button onClick={() => setNameChangeButton(!nameChangeButton)}>*/}
              {/*  Edit*/}
              {/*</Button>*/}
            </ListItem>
            <ListItem>
              <TextField
                label="Contraseña"
                variant="outlined"
                size={"small"}
                value={"********"}
                fullWidth
                disabled
              />
              {/*<Button*/}
              {/*  onClick={() => setPasswordChangeButton(!passwordChangeButton)}*/}
              {/*>*/}
              {/*  Edit*/}
              {/*</Button>*/}
            </ListItem>
            <ListItem>
              <TextField
                label="Email"
                variant="outlined"
                size={"small"}
                value={user.email}
                fullWidth
                disabled
              />
              {/*<Button className={styles.emailButton}></Button>*/}
            </ListItem>
          </List>
        </Grid>
        <Grid xs>
          <h3>Contacto</h3>
          <List>
            <ListItem>
              <TextField
                label="Celular"
                variant="outlined"
                size={"small"}
                fullWidth
                disabled
              />
              {/*<Button*/}
              {/*  onClick={() => setCellphoneChangeButton(!cellphoneChangeButton)}*/}
              {/*>*/}
              {/*  Edit*/}
              {/*</Button>*/}
            </ListItem>
            <ListItem>
              <TextField
                label="Telefono Fijo"
                variant="outlined"
                size={"small"}
                fullWidth
                disabled
              />
              {/*<Button onClick={() => setPhoneChangeButton(!phoneChangeButton)}>*/}
              {/*  Edit*/}
              {/*</Button>*/}
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
}
