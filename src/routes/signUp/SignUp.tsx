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

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
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

const items = [
  { value: "normal", label: "Comprador/Vendedor" },
  { value: "inspector", label: "Inspector" },
  { value: "investor", label: "Inversor" },
  { value: "realState", label: "Inmobiliaria" },
];

export const SignUp = () => {
  const { control, handleSubmit } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
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
            <Grid container xs={12} spacing={3} className={styles.inputs}>
              <Grid xs />
              <Grid xs={4} className={styles.column}>
                <Typography variant={"h5"}>Datos personales</Typography>
                <div className={styles.inputContainer}>
                  <HookFormTextField
                    label={"Nombre"}
                    name={"firstName"}
                    control={control}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <HookFormTextField
                    label={"Apellido"}
                    name={"lastName"}
                    control={control}
                  />
                </div>
                <Grid xs={3} />
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
              <Grid xs={4} className={styles.column}>
                <Typography variant={"h5"}>Tipo de usuario</Typography>
                <div className={styles.inputContainer}>
                  <HookFormSelect
                    name={"userType"}
                    items={items}
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
            </Grid>
            <Grid container xs={12} className={styles.gridButton}>
              <div className={styles.buttonContainer}>
                <RoundedButton type={"submit"}>Crear cuenta</RoundedButton>
              </div>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};
