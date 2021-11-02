import styles from "./UserProfileMobile.module.scss";
import React from "react";
import { Button, Grid, TextField, withStyles } from "@material-ui/core";
import { useGetLoggedUsingGET } from "../../../api";
import { Link } from "react-router-dom";
import { urls } from "../../../constants";
import { RiArrowLeftSLine } from "react-icons/all";

const Editbutton = withStyles({
  root: {
    textTransform: "none",
    "&:hover": {
      background: "#f2f2f2",
    },
  },
})(Button);

export function PersonalDataMobile() {
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
    <Grid className={styles.user_profile_container}>
      <Grid className={styles.user_profile_title}>
        <h3 style={{ textAlign: "center" }}>Perfil</h3>
      </Grid>
      <Grid className={styles.user_profile_go_back}>
        <Link to={urls.userProfile.path}>
          <Button
            style={{
              textTransform: "none",
              width: "100%",
              justifyContent: "left",
            }}
            size={"small"}
          >
            <RiArrowLeftSLine
              style={{ marginBottom: "2px", marginRight: "0.5em" }}
            />
            Volver
          </Button>
        </Link>
      </Grid>
      <Grid>
        <h3 style={{ color: "#ff701f", fontWeight: "bold" }}>
          Datos personales
        </h3>
        <span style={{ fontSize: "0.8em" }}>
          Aqui puedes ver o editar tus datos personales
        </span>
      </Grid>
      <Grid xs>
        <h5 className={styles.persona_data_subtitles}>Personales</h5>
        <span>Nombre de usuario</span>
        <Grid xs style={{ marginBottom: "1em" }}>
          <TextField
            variant="outlined"
            value={user.userName}
            className={styles.personal_data_textfield}
            size={"small"}
            disabled
            style={{ width: "75%" }}
          />
          <Editbutton onClick={openChangeUsername}>Editar</Editbutton>
        </Grid>
        <span className={styles.spantags}>Contraseña</span>
        <Grid xs style={{ marginBottom: "1em" }}>
          <TextField
            variant="outlined"
            size={"small"}
            value={"********"}
            className={styles.personal_data_textfield}
            style={{ width: "75%" }}
            disabled
          />
          <Editbutton onClick={openChangePassword}>Editar</Editbutton>
        </Grid>
      </Grid>
      <Grid style={{ border: "1px solid #EBEDEF" }} />
      <Grid xs>
        <h5 className={styles.persona_data_subtitles}>Contacto</h5>
        <Grid>
          <span>Email</span>
          <Grid>
            <TextField
              variant="outlined"
              size={"small"}
              value={user.email}
              className={styles.personal_data_textfield}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    // <div className={styles.personalDataMainDiv}>
    //   <Grid className={styles.personalDataTitle}>
    //     <p>
    //       Puedes cambiar tus datos personales o agregar algunos para que podamos
    //       comunicarnos con usted.
    //     </p>
    //   </Grid>
    //   <Grid container className={styles.personalDataInformation}>
    //     <Grid xs>
    //       <h3 className={styles.persona_data_subtitles}>Personales</h3>
    //       <span>Nombre de usuario</span>
    //       <Grid xs style={{ marginBottom: "1.5em" }}>
    //         <TextField
    //           variant="outlined"
    //           value={user.userName}
    //           className={styles.personal_data_textfield}
    //           size={"small"}
    //           disabled
    //         />
    //         <Editbutton onClick={openChangeUsername}>Editar</Editbutton>
    //       </Grid>
    //       <span className={styles.spantags}>Contraseña</span>
    //       <Grid xs style={{ marginBottom: "1.5em" }}>
    //         <TextField
    //           variant="outlined"
    //           size={"small"}
    //           value={"********"}
    //           className={styles.personal_data_textfield}
    //           disabled
    //         />
    //         <Editbutton onClick={openChangePassword}>Editar</Editbutton>
    //       </Grid>
    //     </Grid>
    //     <Grid xs>
    //       <h3 className={styles.persona_data_subtitles}>Contacto</h3>
    //       <Grid>
    //         <span>Email</span>
    //         <Grid>
    //           <TextField
    //             variant="outlined"
    //             size={"small"}
    //             value={user.email}
    //             className={styles.personal_data_textfield}
    //             disabled
    //           />
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    //   <Dialog
    //     open={changeUsername}
    //     onClose={closeChangeUsername}
    //     aria-labelledby="form-dialog-title"
    //   >
    //     <DialogTitle id="form-dialog-title">Change Username</DialogTitle>
    //     <DialogContent>
    //       <DialogContentText>
    //         Escribe el nuevo nombre de usuario.
    //       </DialogContentText>
    //       <TextField
    //         autoFocus
    //         margin="dense"
    //         id="name"
    //         label="Nombre de usuario"
    //         type="username"
    //         fullWidth
    //       />
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={closeChangeUsername} color="primary">
    //         Cancel
    //       </Button>
    //       <Button onClick={closeChangeUsername} color="primary">
    //         Subscribe
    //       </Button>
    //     </DialogActions>
    //   </Dialog>
    //   <Dialog
    //     open={changePassword}
    //     onClose={closeChangePassword}
    //     aria-labelledby="form-dialog-title"
    //   >
    //     <DialogTitle id="form-dialog-title">Cambia tu contraseña</DialogTitle>
    //     <DialogContent>
    //       <DialogContentText>Escribe tu antigua contraseña</DialogContentText>
    //       <TextField
    //         autoFocus
    //         margin="dense"
    //         id="name"
    //         label="Antigua contraseña"
    //         type="password"
    //         fullWidth
    //       />
    //     </DialogContent>
    //     <DialogContent>
    //       <DialogContentText>Escribe tu nueva contraseña</DialogContentText>
    //       <TextField
    //         autoFocus
    //         margin="dense"
    //         id="name"
    //         label="Nueva contraseña"
    //         type="password"
    //         fullWidth
    //       />
    //     </DialogContent>
    //     <DialogContent>
    //       <DialogContentText>
    //         Escribe denuevo tu nueva contraseña
    //       </DialogContentText>
    //       <TextField
    //         autoFocus
    //         margin="dense"
    //         id="name"
    //         label="Nueva contraseña"
    //         type="password"
    //         fullWidth
    //       />
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={closeChangePassword} color="primary">
    //         Cancel
    //       </Button>
    //       <Button onClick={closeChangePassword} color="primary">
    //         Subscribe
    //       </Button>
    //     </DialogActions>
    //   </Dialog>
    // </div>
  );
}
