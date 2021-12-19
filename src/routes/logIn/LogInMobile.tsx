import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Link as MLink,
  Typography,
  withStyles,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useSignIn } from "../../api";
import { DividerWithText } from "../../components/common/DividerWithText";
import { HookFormPasswordInput } from "../../components/common/forms/HookFormPasswordInput";
import { HookFormTextField } from "../../components/common/forms/HookFormTextField";
import { errorMessages, urls } from "../../constants";
import { useAppSelector } from "../../store";
import { selectRedirectPath } from "../../store/slices/session";
import GoogleLogin from "./GoogleLogin";
import styles from "./LogInMobile.module.scss";
import { Grid } from "@material-ui/core";

const StyledButton = withStyles({
  root: {
    textTransform: "none",
    fontSize: "1.05em",
  },
})(Button);

const schema = yup.object({
  email: yup
    .string()
    .email(errorMessages.email)
    .required(errorMessages.required),
  password: yup.string().required(errorMessages.required),
});

type LogInFormData = yup.InferType<typeof schema>;

export const LogInMobile = () => {
  const history = useHistory();
  const redirectPath = useAppSelector(selectRedirectPath);

  const { mutateAsync: signIn, isLoading } = useSignIn();

  const { control, handleSubmit } = useForm<LogInFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signIn({ data });
      history.push(redirectPath);
    } catch (e) {}
  });

  return (
    <Grid className={styles.login_container}>
      <div className={styles.titleContainer}>
        <Typography variant={"h4"} style={{ fontWeight: 600 }}>
          Bienvenido a Ubicar
        </Typography>
      </div>
      <Grid>
        <form onSubmit={onSubmit}>
          <Grid className={styles.buttonOptions}>
            <Grid className={styles.internalButtonOptions} container>
              <Grid xs>
                <Link to={urls.logIn} style={{ textDecoration: "none" }}>
                  <StyledButton type={"button"}>Iniciar Sesión</StyledButton>
                </Link>
                <Grid className={styles.highlighter} />
              </Grid>
              <Grid xs>
                <Link to={urls.signUp} style={{ textDecoration: "none" }}>
                  <StyledButton type={"button"}>Registrarse</StyledButton>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <HookFormTextField
              label={"Email"}
              name={"email"}
              control={control}
            />
          </Grid>
          <Grid>
            <HookFormPasswordInput
              label={"Contraseña"}
              name={"password"}
              control={control}
            />
          </Grid>
          <Grid className={styles.buttonContainer}>
            <Button type={"submit"}>
              {isLoading ? "..." : "Iniciar Sesión"}
            </Button>
          </Grid>
          <Grid className={styles.link}>
            <Link to={urls.signUp}>
              <MLink
                variant="body2"
                component={"span"}
                style={{ color: "grey" }}
              >
                {"Olvidaste tu contraseña?"}
              </MLink>
            </Link>
          </Grid>
          <Grid>
            <DividerWithText>O</DividerWithText>
          </Grid>
          <GoogleLogin />
        </form>
      </Grid>
    </Grid>
  );
};
