import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Typography } from "@material-ui/core";
import { HookFormTextField } from "../../components/common/forms/HookFormTextField";
import { HookFormPasswordInput } from "../../components/common/forms/HookFormPasswordInput";
import styles from "./LogIn.module.scss";
import { RoundedButton } from "../../components/common/buttons/RoundedButton";
import GoogleLogin from "./GoogleLogin";
import { DividerWithText } from "../../components/common/DividerWithText";
import { useHistory } from "react-router-dom";
import { actions, useAppDispatch, useAppSelector } from "../../store";
import { selectRedirectPath } from "../../store/slices/session";
import { useSignIn } from "../../api/auth";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type LogInFormData = yup.InferType<typeof schema>;

export const LogIn = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const redirectPath = useAppSelector(selectRedirectPath);

  const { mutateAsync, isLoading } = useSignIn();

  const { control, handleSubmit } = useForm<LogInFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const signInRes = await mutateAsync(data);
      // const signInRes = {
      //   email: "asdf",
      //   id: 86896,
      // };
      dispatch(actions.session.setUser(signInRes));
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
            </div>
            <div className="mt-3">
              <DividerWithText>O</DividerWithText>
            </div>
          </form>
          <GoogleLogin />
        </div>
      </div>
    </Container>
  );
};
