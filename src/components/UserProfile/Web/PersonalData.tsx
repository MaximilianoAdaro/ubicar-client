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
import {
  useEditUserUsingPUT,
  useGetLoggedUsingGET,
  useSetTagsUsingPUT,
} from "../../../api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { urls } from "../../../constants";

const Editbutton = withStyles({
  root: {
    textTransform: "none",
    "&:hover": {
      background: "#f2f2f2",
    },
  },
})(Button);

export function PersonalData() {
  const { data: user } = useGetLoggedUsingGET();
  const [changeUsername, setChangeUsername] = React.useState(false);
  const [changePassword, setChangePassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const history = useHistory();

  const openChangeUsername = () => {
    setChangeUsername(true);
  };

  const openChangePassword = () => {
    setChangePassword(true);
  };

  const closeChangeUsername = () => {
    setChangeUsername(false);
  };

  const changeUsernameFunct = async () => {
    setChangeUsername(false);
    try {
      await mutateAsync({
        id: user!.id,
        data: { email: user!.email, userName: username, id: user!.id },
      });
    } catch (e) {
      throw Error;
    }
    window.location.reload();
  };

  const { mutateAsync } = useEditUserUsingPUT({
    mutation: {
      onSuccess() {
        toast.success(" ✅ Nombre de usuario cambiado!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      },
      onError() {
        toast.error(" ❌ Error en cambio de nombre de usuario!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      },
    },
  });

  const closeChangePassword = () => {
    setChangePassword(false);
  };

  if (!user) return <h4>Error</h4>;

  const handleChange = (e: any) => {
    setUsername(e.target.value);
    console.log(username);
  };

  return (
    <div className={styles.personalDataMainDiv}>
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
          <Grid xs style={{ marginBottom: "1.5em" }}>
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
          <Grid xs style={{ marginBottom: "1.5em" }}>
            <TextField
              variant="outlined"
              size={"small"}
              value={"********"}
              className={styles.personal_data_textfield}
              disabled
            />
            <Editbutton onClick={openChangePassword}>Editar</Editbutton>
          </Grid>
        </Grid>
        <Grid xs>
          <h3 className={styles.persona_data_subtitles}>Contacto</h3>
          <Grid>
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
        </Grid>
      </Grid>
      <Dialog
        open={changeUsername}
        onClose={closeChangeUsername}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Cambiar nombre</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Escribe tu nuevo nombre de usuario
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre de usuario"
            type="username"
            fullWidth
            value={username}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeChangeUsername}
            style={{ backgroundColor: "#2d557a", color: "white" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={changeUsernameFunct}
            style={{ backgroundColor: "#2d557a", color: "white" }}
          >
            Confirmar
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
            Escribe de nuevo tu nueva contraseña
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
          <Button
            onClick={closeChangePassword}
            style={{ backgroundColor: "#2d557a", color: "white" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={closeChangePassword}
            style={{ backgroundColor: "#2d557a", color: "white" }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
