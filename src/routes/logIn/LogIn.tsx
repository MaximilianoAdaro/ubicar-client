import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Link as MLink, Typography } from "@material-ui/core";
import { HookFormTextField } from "../../components/common/forms/HookFormTextField";
import { HookFormPasswordInput } from "../../components/common/forms/HookFormPasswordInput";
import styles from "./LogIn.module.scss";
import { RoundedButton } from "../../components/common/buttons/RoundedButton";
import GoogleLogin from "./GoogleLogin";
import { DividerWithText } from "../../components/common/DividerWithText";
import { Link, useHistory } from "react-router-dom";
import { useAppSelector } from "../../store";
import { selectRedirectPath } from "../../store/slices/session";
import { useSignIn } from "../../api/auth";
import { urls } from "../../constants";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
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
        <Typography variant={"h3"}>Inicia sesion</Typography>
      </div>

      <div className={styles.form}>
        <div className={"w-25"}>
          <form onSubmit={onSubmit}>
            <div className={"mt-5"}>
              <HookFormTextField
                label={"Email"}
                name={"email"}
                control={control}
              />
            </div>
            <div className={"mt-4"}>
              <HookFormPasswordInput
                label={"Contraseña"}
                name={"password"}
                control={control}
              />
            </div>
            <div className={styles.buttonContainer}>
              <RoundedButton type={"submit"}>
                {isLoading ? "..." : "Entrar"}
              </RoundedButton>
              <div className={styles.link}>
                <Link to={urls.signUp}>
                  <MLink variant="body2" component={"span"}>
                    {"No tienes una cuenta? Registrate"}
                  </MLink>
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <DividerWithText>O</DividerWithText>
            </div>
          </form>
          <GoogleLogin />
        </div>
      </div>
    </Container>
  );
};
