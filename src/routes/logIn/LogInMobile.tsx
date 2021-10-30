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
import { useSignIn } from "../../api/custom/auth";
import { DividerWithText } from "../../components/common/DividerWithText";
import { HookFormPasswordInput } from "../../components/common/forms/HookFormPasswordInput";
import { HookFormTextField } from "../../components/common/forms/HookFormTextField";
import { errorMessages, urls } from "../../constants";
import { actions, useAppSelector } from "../../store";
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
        <form>
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
    // <Container>
    //   <div className={styles.titleContainer}>
    //     <Typography variant={"h3"} style={{ fontWeight: 600 }}>
    //       Bienvenido a Ubicar
    //     </Typography>
    //   </div>
    //   <form onSubmit={onSubmit}>
    //     <div className={styles.form}>
    //       <div className={styles.leftContainer}>
    //         <div className={styles.buttonOptions}>
    //           <div className={styles.internalButtonOptions}>
    //             <Link to={urls.logIn} style={{ textDecoration: "none" }}>
    //               <Button type={"button"} style={{ fontSize: "larger" }}>
    //                 Iniciar Sesión
    //               </Button>
    //             </Link>
    //             <div className={styles.highlighter} />
    //           </div>
    //           <div className={styles.internalButtonOptions}>
    //             <Link to={urls.signUp} style={{ textDecoration: "none" }}>
    //               <Button type={"button"} style={{ fontSize: "larger" }}>
    //                 Registrarse
    //               </Button>
    //             </Link>
    //           </div>
    //         </div>
    //         <div className={styles.input1}>
    //           <HookFormTextField
    //             label={"Email"}
    //             name={"email"}
    //             control={control}
    //           />
    //         </div>
    //         <div className={styles.input2}>
    //           <HookFormPasswordInput
    //             label={"Contraseña"}
    //             name={"password"}
    //             control={control}
    //           />
    //         </div>
    //       </div>
    //       <div className={styles.rightContainer}>
    //         <div className={styles.insideRightContainer}>
    //           <div className={styles.buttonContainer}>
    //             <Button type={"submit"}>
    //               {isLoading ? "..." : "Iniciar Sesión"}
    //             </Button>
    //             <div className={styles.link}>
    //               <Link to={urls.signUp}>
    //                 <MLink
    //                   variant="body2"
    //                   component={"span"}
    //                   style={{ color: "grey" }}
    //                 >
    //                   {"Olvidaste tu contraseña?"}
    //                 </MLink>
    //               </Link>
    //             </div>
    //           </div>
    //           <div style={{ marginTop: "10px" }}>
    //             <DividerWithText>O</DividerWithText>
    //           </div>
    //           <GoogleLogin />
    //         </div>
    //       </div>
    //     </div>
    //   </form>
    // </Container>
  );
};
