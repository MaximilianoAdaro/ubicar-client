import { Container, Grid, Typography } from "@material-ui/core";
import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { HookFormTextField } from "../../components/common/forms/HookFormTextField";
import { HookFormDatePicker } from "../../components/common/forms/HookFormDatePicker";
import { HookFormSelect } from "../../components/common/forms/HookFormSelect";
import { HookFormPasswordInput } from "../../components/common/forms/HookFormPasswordInput";
import { RoundedButton } from "../../components/common/buttons/RoundedButton";
import { useSignUp } from "../../api/auth";
import { useHistory } from "react-router-dom";
import { urls } from "../../constants";

const schema = yup.object({
  userName: yup.string().required(),
  email: yup.string().email().required(),
  birthDay: yup.date().required(),
  userType: yup
    .string()
    .oneOf(["normal", "inspector", "investor", "realState"])
    .required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas son distintas")
    .required(),
});

type SignUpFormData = yup.InferType<typeof schema>;

const userTypes = [
  { value: "normal", label: "Comprador/Vendedor" },
  { value: "inspector", label: "Inspector" },
  { value: "investor", label: "Inversor" },
  { value: "realState", label: "Inmobiliaria" },
];

export const SignUp = () => {
  const history = useHistory();

  const { mutateAsync } = useSignUp();

  const { control, handleSubmit } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(data);
      history.push(urls.logIn);
    } catch (e) {}
  });

  return (
    <>
      <Container>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid xs={12} className={styles.titleContainer}>
              <Typography variant={"h3"} className={styles.title}>
                Registrate
              </Typography>
            </Grid>
            <div className={styles.inputs}>
              <Grid xs={4} className={styles.column}>
                <Typography variant={"h5"}>Datos personales</Typography>
                <div className={styles.inputContainer}>
                  <HookFormTextField
                    label={"Nombre"}
                    name={"userName"}
                    control={control}
                  />
                </div>
                <Grid xs className={styles.emailAndBirthday}>
                  <div className={styles.inputContainer}>
                    <HookFormTextField
                      label={"Email"}
                      name={"email"}
                      control={control}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <HookFormDatePicker
                      label={"Fecha de nacimiento"}
                      name={"birthDay"}
                      control={control}
                    />
                  </div>
                </Grid>
              </Grid>
              <div
                style={{
                  width: "2em",
                }}
              />
              <Grid xs={4} className={styles.column}>
                <Typography variant={"h5"}>Tipo de usuario</Typography>
                <div className={styles.inputContainer}>
                  <HookFormSelect
                    name={"userType"}
                    items={userTypes}
                    control={control}
                  />
                </div>
                <div className={styles.password}>
                  <Typography variant={"h5"}>Contraseña</Typography>
                  <div className={styles.inputContainer}>
                    <HookFormPasswordInput
                      label={"Contraseña"}
                      name={"password"}
                      control={control}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <HookFormPasswordInput
                      label={"Confirmar contraseña"}
                      name={"confirmPassword"}
                      control={control}
                    />
                  </div>
                </div>
              </Grid>
            </div>
            <div className={styles.gridButton}>
              <div className={styles.buttonContainer}>
                <RoundedButton type={"submit"}>Crear cuenta</RoundedButton>
              </div>
            </div>
          </Grid>
        </form>
      </Container>
    </>
  );
};
