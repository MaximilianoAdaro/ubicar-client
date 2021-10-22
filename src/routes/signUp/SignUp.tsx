import { Button, Container, styled, Typography } from "@material-ui/core";
import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from "@hookform/resolvers/yup";
import { HookFormTextField } from "../../components/common/forms/HookFormTextField";
import { HookFormSelect } from "../../components/common/forms/HookFormSelect";
import { HookFormPasswordInput } from "../../components/common/forms/HookFormPasswordInput";
import { Link, useHistory } from "react-router-dom";
import { errorMessages, urls } from "../../constants";
import { GoogleLogin } from "../logIn/GoogleLogin";
import { RoleDTO, useGetRolesUsingGET, useSignUp } from "../../api";
import { DividerWithText } from "../../components/common/DividerWithText";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

const schema = yup.object({
  firstName: yup.string().required(errorMessages.required),
  lastName: yup.string().required(errorMessages.required),
  email: yup
    .string()
    .email(errorMessages.email)
    .required(errorMessages.required),
  userRole: yup.string().required(errorMessages.required),
  password: yup.string().required(errorMessages.required),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas son distintas")
    .required(errorMessages.required),
});

type SignUpFormData = yup.InferType<typeof schema>;

const buildItems = (roles: RoleDTO[]) =>
  roles.map(({ title, id }) => ({
    value: id,
    label: title,
  }));

export const SignUp = () => {
  const history = useHistory();

  const { data: roles } = useGetRolesUsingGET();
  const { mutateAsync } = useSignUp();

  const [open, setOpen] = useState(false);

  const { control, handleSubmit } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync({
        data: {
          ...data,
          birthDate: new Date().toISOString(),
          userName: `${data.firstName} ${data.lastName}`,
        },
      });
      history.push(urls.logIn);
    } catch (e) {}
  });

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }

  const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  return (
    <Container>
      <div className={styles.titleContainer}>
        <Typography variant={"h3"} style={{ fontWeight: 600 }}>
          Bienvenido a Ubicar
        </Typography>
      </div>
      <form onSubmit={onSubmit}>
        <div className={styles.form}>
          <div className={styles.leftContainer}>
            <div className={styles.buttonOptions}>
              <div className={styles.internalButtonOptions}>
                <Link to={urls.logIn} style={{ textDecoration: "none" }}>
                  <Button type={"button"} style={{ fontSize: "larger" }}>
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
              <div className={styles.internalButtonOptions}>
                <Link to={urls.signUp} style={{ textDecoration: "none" }}>
                  <Button type={"button"} style={{ fontSize: "larger" }}>
                    Registrarse
                  </Button>
                </Link>
                <div className={styles.highlighter} />
              </div>
            </div>
            <div className={styles.input1}>
              <HookFormTextField
                label={"Nombre"}
                name={"firstName"}
                control={control}
              />
            </div>
            <div className={styles.input2}>
              <HookFormTextField
                label={"Apellido"}
                name={"lastName"}
                control={control}
              />
            </div>
            <div className={styles.input2}>
              <HookFormTextField
                label={"Email"}
                name={"email"}
                control={control}
              />
            </div>
            <div className={styles.input2}>
              <HookFormPasswordInput
                label={"Contraseña"}
                name={"password"}
                control={control}
              />
            </div>
            <div className={styles.input2}>
              <HookFormPasswordInput
                label={"Confirmar contraseña"}
                name={"confirmPassword"}
                control={control}
              />
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.insideRightContainer}>
              <div style={{ display: "flex" }}>
                <Typography variant={"h6"} style={{ textAlign: "left" }}>
                  Tipo de usuario
                </Typography>
                <HelpOutlineIcon
                  fontSize="small"
                  style={{ margin: "auto 5px" }}
                  onClick={handleOpen}
                />
                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                >
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                  >
                    Tipo de usuario
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    <Typography gutterBottom>
                      <b>Comprador/Vendedor:</b> Usuarios interesados en comprar
                      o alquilar una propiedad para uso personal, o vender algun
                      inmueble que posean.
                    </Typography>
                    <Typography gutterBottom>
                      <b>Inpector:</b> Usuarios dedicados a la inspección de
                      propiedades que se publican en la aplicación antes de que
                      estén al alcance del público para asegurar la calidad del
                      servicio que proveemos.
                    </Typography>
                    <Typography gutterBottom>
                      <b>Inversor:</b> Usuarios interesados en encontrar
                      oportunidades de inversión en inmuebles publicados
                      alrededor de toda la Argentina.
                    </Typography>
                    <Typography gutterBottom>
                      <b>Inmobiliaria:</b> Usuarios interesados en utilizar
                      otros medios de comunicación para promocionar un inmueble
                      que se les ha sido encargado vender.
                    </Typography>
                  </DialogContent>
                </BootstrapDialog>
              </div>
              <div className={styles.inputContainer}>
                {roles && (
                  <HookFormSelect
                    name={"userRole"}
                    items={buildItems(roles)}
                    control={control}
                  />
                )}
              </div>
              <div className={styles.buttonContainer}>
                <Button type={"submit"}>Crear cuenta</Button>
              </div>
              <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                <DividerWithText>O</DividerWithText>
              </div>
              <GoogleLogin />
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
};
