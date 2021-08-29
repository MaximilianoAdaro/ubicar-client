import styles from "./UserProfile.module.scss";
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  TextField,
} from "@material-ui/core";
import { useGetLoggedUsingGET } from "../../api";

export function PersonalData() {
  // const [emailChangeButton, setEmailChangeButton] = useState(true);
  // const [passwordChangeButton, setPasswordChangeButton] = useState(true);
  // const [nameChangeButton, setNameChangeButton] = useState(true);
  // const [cellphoneChangeButton, setCellphoneChangeButton] = useState(true);
  // const [phoneChangeButton, setPhoneChangeButton] = useState(true);
  const { data: user } = useGetLoggedUsingGET();
  const [changeUsername, setChangeUsername] = React.useState(false);
  const [changePassword, setChangePassword] = React.useState(false);

  const openChangeUsername = () => {
    setChangeUsername(true);
  };

  const openChangePassword = () => {
    setChangePassword(true);
  };

  const closeChangeUsername = () => {
    setChangeUsername(false);
  };

  const closeChangePassword = () => {
    setChangePassword(false);
  };

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
              <Button onClick={openChangeUsername}>Edit</Button>
              <Dialog
                open={changeUsername}
                onClose={closeChangeUsername}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Change Username
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Escribe el nuevo nombre de usuario.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nombre de usuario"
                    type="username"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeChangeUsername} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={closeChangeUsername} color="primary">
                    Subscribe
                  </Button>
                </DialogActions>
              </Dialog>
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
              <Button onClick={openChangePassword}>Edit</Button>
              <Dialog
                open={changePassword}
                onClose={closeChangePassword}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Cambia tu contraseña
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Escribe tu antigua contraseña
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Antigua contraseña"
                    type="password"
                    fullWidth
                  />
                </DialogContent>
                <DialogContent>
                  <DialogContentText>
                    Escribe tu nueva contraseña
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nueva contraseña"
                    type="password"
                    fullWidth
                  />
                </DialogContent>
                <DialogContent>
                  <DialogContentText>
                    Escribe denuevo tu nueva contraseña
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nueva contraseña"
                    type="password"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeChangePassword} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={closeChangePassword} color="primary">
                    Subscribe
                  </Button>
                </DialogActions>
              </Dialog>
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
