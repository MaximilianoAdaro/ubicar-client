import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Grid, Typography } from "@material-ui/core";
import { HookFormTextField } from "../../components/common/forms/HookFormTextField";
import { HookFormPasswordInput } from "../../components/common/forms/HookFormPasswordInput";
import styles from "./LogIn.module.scss";
import { RoundedButton } from "../../components/common/buttons/RoundedButton";
import {useEffect, useState, memo} from "react";

import {
  Alert,
  Button,
  Nav,
  Navbar,
  NavItem,
  NavbarBrand,
} from 'reactstrap';
import { compose } from 'redux';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from "axios";
import {baseUrl} from "../../api/config";
import GoogleLogin from "./GoogleLogin";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type LogInFormData = yup.InferType<typeof schema>;

export const LogIn = () => {
  const { control, handleSubmit } = useForm<LogInFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} className={styles.titleContainer}>
            <Typography variant={"h3"} className={styles.title}>
              Inicia sesion
            </Typography>
          </Grid>
          <Grid container xs={12} spacing={3}>
            <Grid xs />
            <Grid xs={4} className={styles.inputs}>
              <GoogleLogin/>
              <div className={styles.inputContainer}>
                <HookFormTextField
                  label={"Email"}
                  name={"email"}
                  control={control}
                />
              </div>
              <div className={styles.inputContainer}>
                <HookFormPasswordInput
                  label={"Contraseña"}
                  name={"password"}
                  control={control}
                />
              </div>
              <div className={styles.buttonContainer}>
                <RoundedButton type={"submit"}>Entrar</RoundedButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
