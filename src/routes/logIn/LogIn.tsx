import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  Link as MLink,
  Typography,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useSignIn } from "../../api";
import { DividerWithText } from "../../components/common/DividerWithText";
import { HookFormPasswordInput } from "../../components/common/forms/HookFormPasswordInput";
import { HookFormTextField } from "../../components/common/forms/HookFormTextField";
import { errorMessages, urls } from "../../constants";
import { actions, useAppSelector } from "../../store";
import { selectRedirectPath } from "../../store/slices/session";
import GoogleLogin from "./GoogleLogin";
import styles from "./LogIn.module.scss";

const schema = yup.object({
  email: yup
    .string()
    .email(errorMessages.email)
    .required(errorMessages.required),
  password: yup.string().required(errorMessages.required),
});

type LogInFormData = yup.InferType<typeof schema>;

export const LogIn = () => {
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
    <Container>
      <div className={styles.titleContainer}>
        <Typography
          variant={"h3"}
          style={{ fontWeight: 600, marginTop: "2em" }}
        >
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
                <div className={styles.highlighter} />
              </div>
              <div className={styles.internalButtonOptions}>
                <Link to={urls.signUp} style={{ textDecoration: "none" }}>
                  <Button type={"button"} style={{ fontSize: "larger" }}>
                    Registrarse
                  </Button>
                </Link>
              </div>
            </div>
            <div className={styles.input1}>
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
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.insideRightContainer}>
              <div className={styles.buttonContainer}>
                <Button type={"submit"}>
                  {isLoading ? "..." : "Iniciar Sesión"}
                </Button>
                <div className={styles.link}>
                  <Link to={urls.signUp}>
                    <MLink
                      variant="body2"
                      component={"span"}
                      style={{ color: "grey" }}
                    >
                      {"Olvidaste tu contraseña?"}
                    </MLink>
                  </Link>
                </div>
              </div>
              <div style={{ marginTop: "10px" }}>
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
