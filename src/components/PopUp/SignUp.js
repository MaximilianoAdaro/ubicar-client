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
    <Dialog
      onClose={() => setIsOpened(false)}
      open={Boolean(isOpened)}
      style={{ padding: "20px" }}
    >
      <DialogTitle>Entrá a tu cuenta!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para poder utilizar nuestra plataforma con todo su potencial!
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "#2d557a", color: "white" }}
          onClick={() => history.push(urls.logIn)}
        >
          Log in
        </Button>

        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "#2d557a", color: "white" }}
          onClick={() => setIsOpened(false)}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignUp;
