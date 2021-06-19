import { Col, Container, Form } from "react-bootstrap";
import * as yup from "yup";
import { createCustomTextInput } from "../../forms/customForm/TextInput";
import { useCustomForm } from "../../../hooks/useCustomForm";
import { CustomForm } from "../../forms/customForm/CustomForm";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import { createCustomTextInputArea } from "../../forms/customForm/TextAreaInput";
import { Step } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import { Select } from "../../forms/Select";
import { StepButtons } from "../StepButtons/StepButtons";
import React from "react";
import styles from "./Characteristics.module.scss";
import { useFetchPropertyStyles } from "../../../api/propertyOptionals";

const requiredMessage = "Este campo es requerido";

const schema = yup.object({
  totalSurface: yup.number().required(requiredMessage),
  coveredSurface: yup.number().required(requiredMessage),
  rooms: yup.number().positive().integer().required(requiredMessage),
  environments: yup.number().positive().integer().required(requiredMessage),
  toilets: yup.number().positive().integer().required(requiredMessage),
  fullBaths: yup.number().positive().integer().required(requiredMessage),
  constructionYear: yup.number().required(requiredMessage),
  floors: yup.number().required(),
  parkDescription: yup.string(),
});

export type CharacteristicsFormData = yup.InferType<typeof schema>;

const CharacteristicsTextInput =
  createCustomTextInput<CharacteristicsFormData>();
const CharacteristicsTextArea =
  createCustomTextInputArea<CharacteristicsFormData>();

export const Characteristics = (props: any) => {
  const defaults = useAppSelector(
    ({ createPropertyForm: { characteristics, style } }) => ({
      ...characteristics,
      style,
    })
  );
  const dispatch = useAppDispatch();

  const { data: propertyStyles } = useFetchPropertyStyles();

  if (defaults.style === undefined && propertyStyles?.[0].id !== undefined) {
    dispatch(actions.createPropertyForm.setStyle(propertyStyles[0].id));
  }

  const customForm = useCustomForm<CharacteristicsFormData>({
    schema,
    onSubmit: (data) => {
      dispatch(actions.createPropertyForm.setCharacteristics(data));
      dispatch(actions.createPropertyForm.setStep(Step.OptionalInfo));
    },
  });

  const handlePreviousButton = async () => {
    const isValid = await customForm.methods.trigger();
    if (isValid) {
      const data = customForm.methods.getValues();
      dispatch(actions.createPropertyForm.setCharacteristics(data));
      dispatch(actions.createPropertyForm.setStep(Step.Address));
    }
  };

  return (
    <Container>
      <CustomForm {...customForm}>
        <Form.Row>
          <Col>
            <Form.Row>
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="totalSurface"
                    label="Superficie total (m²)"
                    defaultValue={props.data.data.squareFoot}
                  />
                </div>
              </Col>
              <Col xs={1} />
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="coveredSurface"
                    label="Superficie cubierta (m²)"
                    defaultValue={props.data.data.coveredSquareFoot}
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
                    defaultValue={props.data.data.environments}
                  />
                </div>
              </Col>
              <Col xs={1} />
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="rooms"
                    label="Cantidad de habitaciones"
                    defaultValue={props.data.data.rooms}
                  />
                </div>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="fullBaths"
                    label="Baños completos"
                    defaultValue={props.data.data.fullBaths}
                  />
                </div>
              </Col>
              <Col xs={1} />
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="toilets"
                    label="Toilettes"
                    defaultValue={props.data.data.toilets}
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
                    defaultValue={props.data.data.levels}
                  />
                </div>
              </Col>
              <Col xs={1} />
              <Col xs={7}>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="constructionYear"
                    label="Año de construccion"
                    defaultValue={props.data.data.constructionDate}
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
                        dispatch(actions.createPropertyForm.setStyle(id))
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
                    defaultValue={props.data.data.parkDescription}
                  />
                </div>
              </Col>
            </Form.Row>
          </Col>
        </Form.Row>
        <StepButtons type={"submit"} onPrevious={handlePreviousButton} />
      </CustomForm>
    </Container>
  );
};
