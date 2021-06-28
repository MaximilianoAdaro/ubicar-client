import { Container, Grid, Link as MLink, Typography } from "@material-ui/core";
import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { HookFormTextField } from "../../components/common/forms/HookFormTextField";
import { HookFormDatePicker } from "../../components/common/forms/HookFormDatePicker";
import { HookFormSelect } from "../../components/common/forms/HookFormSelect";
import { HookFormPasswordInput } from "../../components/common/forms/HookFormPasswordInput";
import { RoundedButton } from "../../components/common/buttons/RoundedButton";
import { Link, useHistory } from "react-router-dom";
import { urls } from "../../constants";
import { GoogleLogin } from "../logIn/GoogleLogin";
import { RoleDTO, useGetRolesUsingGET, useSignUp } from "../../api";

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  birthDate: yup.date().required(),
  userRole: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas son distintas")
    .required(),
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

  const { control, handleSubmit } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync({
        data: {
          ...data,
          birthDate: data.birthDate.toISOString(),
          userName: `${data.firstName} ${data.lastName}`,
        },
      });
      history.push(urls.logIn);
    } catch (e) {}
  });

  return (
    <>
      <Container
        style={{
          marginBottom: 70,
        }}
      >
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} className={styles.titleContainer}>
              <Typography variant={"h3"} className={styles.mainTitle}>
                Registrate
              </Typography>
            </Grid>
            <div className={styles.inputs}>
              <div className={styles.column}>
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
                <div className={styles.emailAndBirthdate}>
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
                      name={"birthDate"}
                      control={control}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.rightColumn}>
                  <Typography variant={"h5"}>Tipo de usuario</Typography>
                  <div className={styles.inputContainer}>
                    {roles && (
                      <HookFormSelect
                        name={"userRole"}
                        items={buildItems(roles)}
                        control={control}
                      />
                    )}
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
                </div>
              </div>
            </div>
            <div className={styles.buttonSection}>
              <div className={styles.gridButton}>
                <div>
                  <GoogleLogin />
                </div>
                <span>O</span>
                <div className={styles.buttonContainer}>
                  <RoundedButton type={"submit"}>Crear cuenta</RoundedButton>
                </div>
              </div>
              <div>
                <div className={styles.link}>
                  <Link to={urls.logIn}>
                    <MLink variant="body2" component={"span"}>
                      {"Ya tienes una cuenta? Entra"}
                    </MLink>
                  </Link>
                </div>
              </div>
            </div>
          </Grid>
        </form>
      </Container>
    </>
  );
};
