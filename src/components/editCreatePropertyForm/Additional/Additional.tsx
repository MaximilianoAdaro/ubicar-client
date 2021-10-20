import { Contacts } from "./Contacts";
import * as yup from "yup";
import { useCustomForm } from "../../../hooks/useCustomForm";
import { createCustomTextInputArea } from "../../forms/customForm/TextAreaInput";
import { CustomForm } from "../../forms/customForm/CustomForm";
import { Col, Container, Form } from "react-bootstrap";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import { Step } from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import { StepButtons } from "../StepButtons/StepButtons";
import styles from "./Additional.module.scss";
import { OpenHouse } from "./OpenHouse";
import { Grid } from "@material-ui/core";

const schema = yup.object({
  description: yup.string(),
});

export type AdditionalFormData = yup.InferType<typeof schema>;

const AdditionalTextArea = createCustomTextInputArea<AdditionalFormData>();

export const Additional = () => {
  const defaults = useAppSelector(
    ({
      editPropertyForm: {
        additional: { description },
      },
    }) => ({
      description,
    })
  );
  const dispatch = useAppDispatch();
  const customForm = useCustomForm<AdditionalFormData>({
    schema,
    onSubmit: (data) => {
      dispatch(actions.editPropertyForm.setAdditional(data));
      dispatch(actions.editPropertyForm.setStep(Step.Confirmation));
    },
  });

  const handlePreviousButton = () => {
    dispatch(actions.editPropertyForm.setStep(Step.Multimedia));
  };

  const canSave = async () => {
    const isValidToSave = await customForm.methods.trigger();
    if (isValidToSave) {
      const data = customForm.methods.getValues();
      dispatch(actions.editPropertyForm.setAdditional(data));
    }
    return isValidToSave;
  };

  return (
    <Grid className={styles.additional_container}>
      <CustomForm {...customForm}>
        <Grid container>
          <Grid xs={8} container>
            <Grid xs>
              <Contacts />
            </Grid>
            <Grid xs>
              {/*<h4>Open house</h4>*/}
              <OpenHouse />
            </Grid>
          </Grid>
          <Grid xs className={styles.additional_textarea_grid}>
            <h5>Contanos...</h5>
            <span
              style={{
                fontSize: "0.9em",
              }}
            >
              ¿Que cosas te hacen amar esta propiedad? ¿Que cosas la hacen
              única?
            </span>
            <AdditionalTextArea
              name="description"
              defaultValue={defaults.description}
            />
            <span
              style={{
                fontSize: "small",
                color: "#A1A1A1",
              }}
            >
              Descripción opcional, máximo 800 caracteres.
              <br />
              <br />
            </span>
            <span className={styles.house_description_textarea}>
              ¿Te hace falta inspiración? Hacete estas preguntas:
              <br />
            </span>
            <span
              style={{
                fontSize: "small",
                color: "#A1A1A1",
              }}
            >
              ¿Tiene luz natural?
              <br />
              ¿Los ambientes son espaciosos?
              <br />
              ¿Tiene espacios verdes?
              <br />
              ¿Es un lugar de encuentro?
            </span>
          </Grid>
        </Grid>
        <StepButtons
          type={"submit"}
          onPrevious={handlePreviousButton}
          canPartialSave={canSave}
        />
      </CustomForm>
    </Grid>
  );
};
