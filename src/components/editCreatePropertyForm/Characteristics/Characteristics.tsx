import { Col, Form } from "react-bootstrap";
import * as yup from "yup";
import { createCustomTextInput } from "../../forms/customForm/TextInput";
import { useCustomForm } from "../../../hooks/useCustomForm";
import { CustomForm } from "../../forms/customForm/CustomForm";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import { createCustomTextInputArea } from "../../forms/customForm/TextAreaInput";
import { Step } from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import { Select } from "../../forms/Select";
import { StepButtons } from "../StepButtons/StepButtons";
import styles from "./Characteristics.module.scss";
import { errorMessages } from "../../../constants";
import { useEffect } from "react";
import { useGetStylesUsingGET } from "../../../api";
import { Grid } from "@material-ui/core";

const schema = yup.object({
  totalSurface: yup
    .number()
    .typeError(errorMessages.number)
    .required(errorMessages.required),
  coveredSurface: yup
    .number()
    .typeError(errorMessages.number)
    .required(errorMessages.required),
  rooms: yup
    .number()
    .typeError(errorMessages.number)
    .positive(errorMessages.positiveNumber)
    .integer(errorMessages.integerNumber)
    .required(errorMessages.required),
  environments: yup
    .number()
    .typeError(errorMessages.number)
    .positive(errorMessages.positiveNumber)
    .integer(errorMessages.integerNumber)
    .required(errorMessages.required),
  toilets: yup
    .number()
    .typeError(errorMessages.number)
    .positive(errorMessages.positiveNumber)
    .integer(errorMessages.integerNumber)
    .required(errorMessages.required),
  fullBaths: yup
    .number()
    .typeError(errorMessages.number)
    .positive(errorMessages.positiveNumber)
    .integer(errorMessages.integerNumber)
    .required(errorMessages.required),
  constructionYear: yup
    .number()
    .typeError(errorMessages.number)
    .required(errorMessages.required),
  floors: yup
    .number()
    .typeError(errorMessages.number)
    .required(errorMessages.required),
  parkDescription: yup.string(),
});

export type CharacteristicsFormData = {
  totalSurface: number | undefined;
  coveredSurface: number | undefined;
  rooms: number | undefined;
  environments: number | undefined;
  toilets: number | undefined;
  fullBaths: number | undefined;
  constructionYear: number | undefined;
  floors: number | undefined;
  parkDescription: string;
};

const CharacteristicsTextInput =
  createCustomTextInput<CharacteristicsFormData>();
const CharacteristicsTextArea =
  createCustomTextInputArea<CharacteristicsFormData>();

export const Characteristics = () => {
  const defaults = useAppSelector(
    ({ editPropertyForm: { characteristics, style } }) => ({
      ...characteristics,
      style,
    })
  );
  const dispatch = useAppDispatch();

  const { data: propertyStyles } = useGetStylesUsingGET();

  useEffect(() => {
    if (defaults.style === undefined && propertyStyles?.[0].id !== undefined) {
      dispatch(actions.editPropertyForm.setStyle(propertyStyles[0].id));
    }
  }, [defaults.style, propertyStyles, dispatch]);

  const customForm = useCustomForm<CharacteristicsFormData>({
    schema,
    onSubmit: (data) => {
      dispatch(actions.editPropertyForm.setCharacteristics(data));
      dispatch(actions.editPropertyForm.setStep(Step.OptionalInfo));
    },
  });

  const handlePreviousButton = async () => {
    const isValid = await customForm.methods.trigger();
    if (isValid) {
      const data = customForm.methods.getValues();
      dispatch(actions.editPropertyForm.setCharacteristics(data));
      dispatch(actions.editPropertyForm.setStep(Step.Address));
    }
  };

  const canSave = async () => {
    const isValidToSave = await customForm.methods.trigger();
    if (isValidToSave) {
      const data = customForm.methods.getValues();
      dispatch(actions.editPropertyForm.setCharacteristics(data));
    }
    return isValidToSave;
  };

  return (
    <Grid className={styles.characteristics_container}>
      <CustomForm {...customForm}>
        <Form.Row>
          <Col>
            <Form.Row>
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="totalSurface"
                    label="Superficie total (m??)"
                    defaultValue={defaults.totalSurface?.toString()}
                  />
                </div>
              </Col>
              <Col xs={1} />
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="coveredSurface"
                    label="Superficie cubierta (m??)"
                    defaultValue={defaults.coveredSurface?.toString()}
                  />
                </div>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="environments"
                    label="Cantidad de ambientes"
                    defaultValue={defaults.environments?.toString()}
                  />
                </div>
              </Col>
              <Col xs={1} />
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="rooms"
                    label="Cantidad de habitaciones"
                    defaultValue={defaults.rooms?.toString()}
                  />
                </div>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="fullBaths"
                    label="Ba??os completos"
                    defaultValue={defaults.fullBaths?.toString()}
                  />
                </div>
              </Col>
              <Col xs={1} />
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="toilets"
                    label="Toilettes"
                    defaultValue={defaults.toilets?.toString()}
                  />
                </div>
              </Col>
            </Form.Row>
          </Col>
          <Col xs={1} />
          <Col>
            <Form.Row>
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="floors"
                    label="Cantidad de Pisos"
                    defaultValue={defaults.floors?.toString()}
                  />
                </div>
              </Col>
              <Col xs={1} />
              <Col xs={7}>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="constructionYear"
                    label="A??o de construccion"
                    defaultValue={defaults.constructionYear?.toString()}
                  />
                </div>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <div className={styles.inputContainer}>
                  {propertyStyles && (
                    <Select
                      name={"style"}
                      placeholder={"Estilo"}
                      options={propertyStyles.map(({ label, id }) => ({
                        name: label,
                        id,
                      }))}
                      onSelect={(id) =>
                        dispatch(actions.editPropertyForm.setStyle(id))
                      }
                      defaultValue={defaults.style}
                    />
                  )}
                </div>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextArea
                    name="parkDescription"
                    label={"Caracteristicas del parque"}
                    defaultValue={defaults.parkDescription}
                  />
                </div>
              </Col>
            </Form.Row>
          </Col>
        </Form.Row>
        <Form.Row>
          <StepButtons
            type={"submit"}
            onPrevious={handlePreviousButton}
            canPartialSave={canSave}
          />
        </Form.Row>
      </CustomForm>
    </Grid>
  );
};
