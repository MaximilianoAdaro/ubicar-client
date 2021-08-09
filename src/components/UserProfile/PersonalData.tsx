import styles from "./UserProfile.module.scss";
import React, { useState } from "react";
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
  const [openPasswordChange, setOpenPasswordChange] = useState(false);
  const [openUsernameChange, setOpenUsernameChange] = useState(false);

  const { data: user } = useGetLoggedUsingGET();

  if (!user) return <h4>Error</h4>;

  const handleClosePasswordChange = () => {
    setOpenPasswordChange(false);
  };

  const handleCloseUsernameChange = () => {
    setOpenUsernameChange(false);
  };

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
              <Button
                onClick={() => setOpenUsernameChange(!openUsernameChange)}
              >
                Edit
              </Button>
              <Dialog
                open={openUsernameChange}
                onClose={handleCloseUsernameChange}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Cambio de Usuario
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Ingerese el nuevo nombre de usuario que desea.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nombre de usuario"
                    type="email"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseUsernameChange} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleCloseUsernameChange} color="primary">
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
              <Button
                onClick={() => setOpenPasswordChange(!openPasswordChange)}
              >
                Edit
              </Button>
              <Dialog
                open={openPasswordChange}
                onClose={handleClosePasswordChange}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Cambio de contraseña
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Ingrese la contraseña antigua
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Antigua contraseña"
                    type="email"
                    fullWidth
                  />
                </DialogContent>
                <DialogContent>
                  <DialogContentText>
                    Ingrese la nueva contraseña
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nueva contraseña"
                    type="email"
                    fullWidth
                  />
                </DialogContent>
                <DialogContent>
                  <DialogContentText>
                    Ingrese nuevamente la nueva contraseña
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nueva contraseña"
                    type="email"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClosePasswordChange} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleClosePasswordChange} color="primary">
                    Cambiar contraseña
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
            </ListItem>
            <ListItem>
              <TextField
                label="Telefono Fijo"
                variant="outlined"
                size={"small"}
                fullWidth
                disabled
              />
            </ListItem>
          </List>
          <Button className={styles.saveContactButton} variant={"outlined"}>
            Guardar telefonos
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
