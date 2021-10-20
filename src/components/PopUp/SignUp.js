import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { urls } from "../../constants";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const SignUp = ({ isOpened, setIsOpened }) => {
  const history = useHistory();
  return (
    <Dialog onClose={() => setIsOpened(false)} open={Boolean(isOpened)}>
      <DialogTitle>Registrate!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para poder utilizar nuestra plataforma con todo su potencial!
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => history.push(urls.signUp)}
        >
          Registro de Usuario
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => setIsOpened(false)}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignUp;
