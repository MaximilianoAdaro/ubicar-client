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
              <RoundedButton type={"submit"}>Entrar</RoundedButton>
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
