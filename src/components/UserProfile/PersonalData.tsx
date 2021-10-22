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
  TextField,
  withStyles,
} from "@material-ui/core";
import { useGetLoggedUsingGET } from "../../api";

const Editbutton = withStyles({
  root: {
    textTransform: "none",
    "&:hover": {
      background: "#f2f2f2",
    },
  },
})(Button);

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
        <p>
          Puedes cambiar tus datos personales o agregar algunos para que podamos
          comunicarnos con usted.
        </p>
      </Grid>
      <Grid container className={styles.personalDataInformation}>
        <Grid xs>
          <h3 className={styles.persona_data_subtitles}>Personales</h3>
          <span>Nombre de usuario</span>
          <Grid xs>
            <TextField
              variant="outlined"
              value={user.userName}
              className={styles.personal_data_textfield}
              size={"small"}
              disabled
            />
            <Editbutton onClick={openChangeUsername}>Editar</Editbutton>
          </Grid>
          <span className={styles.spantags}>Contraseña</span>
          <Grid xs>
            <TextField
              variant="outlined"
              size={"small"}
              value={"********"}
              className={styles.personal_data_textfield}
              disabled
            />
            <Editbutton onClick={openChangePassword}>Editar</Editbutton>
          </Grid>
          <span>Email</span>
          <Grid>
            <TextField
              variant="outlined"
              size={"small"}
              value={user.email}
              className={styles.personal_data_textfield}
              disabled
            />
          </Grid>
        </Grid>
        <Grid xs>
          <h3 className={styles.persona_data_subtitles}>Contacto</h3>
          <Grid>
            <span>Celular</span>
            <TextField
              variant="outlined"
              className={styles.personal_data_contact_textfield}
              size={"small"}
              placeholder={"Ej: 1153232343"}
              fullWidth
              disabled
            />
            <p className={styles.personal_data_contact_warning}>
              Te vamos a confirmar el numero por telefono o mensaje de texto.{" "}
              <br />
              Sujeto a las tarifas estandar para mensaje y datos.
            </p>
            <span>Telefono fijo</span>
            <TextField
              placeholder={"Ej: 47816234"}
              className={styles.personal_data_contact_textfield}
              variant="outlined"
              size={"small"}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={changeUsername}
        onClose={closeChangeUsername}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change Username</DialogTitle>
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
      <Dialog
        open={changePassword}
        onClose={closeChangePassword}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Cambia tu contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>Escribe tu antigua contraseña</DialogContentText>
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
          <DialogContentText>Escribe tu nueva contraseña</DialogContentText>
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
    </div>
  );
}
