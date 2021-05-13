import { Col, Container, Form } from "react-bootstrap";
import * as yup from "yup";
import { createCustomTextInput } from "../../forms/customForm/TextInput";
import { useCustomForm } from "../../../hooks/useCustomForm";
import { CustomForm } from "../../forms/customForm/CustomForm";
import { actions, useAppDispatch } from "../../../store";
import { createCustomTextInputArea } from "../../forms/customForm/TextAreaInput";
import { Step } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import { Select } from "../../forms/Select";
import { StepButtons } from "../StepButtons/StepButtons";
import React from "react";
import styles from "./Characteristics.module.scss";

const requiredMessage = "Este campo es requerido";

const schema = yup.object({
  totalSurface: yup.number().required(requiredMessage),
  coveredSurface: yup.number().required(requiredMessage),
  rooms: yup.number().positive().integer().required(requiredMessage),
  ambiences: yup.number().positive().integer().required(requiredMessage),
  toilets: yup.number().positive().integer().required(requiredMessage),
  fullBaths: yup.number().positive().integer().required(requiredMessage),
  constructionYear: yup.number().required(requiredMessage),
  floors: yup.number().required(),
  parkDescription: yup.string(),
});

export type CharacteristicsFormData = yup.InferType<typeof schema>;

const CharacteristicsTextInput = createCustomTextInput<CharacteristicsFormData>();
const CharacteristicsTextArea = createCustomTextInputArea<CharacteristicsFormData>();

export const Characteristics = () => {
  const dispatch = useAppDispatch();
  const customForm = useCustomForm<CharacteristicsFormData>({
    schema,
    onSubmit: (data) => {
      dispatch(actions.createPropertyForm.setCharacteristics(data));
      dispatch(actions.createPropertyForm.setStep(Step.OptionalInfo));
    },
  });
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
                    label="Superficie total"
                  />
                </div>
              </Col>
              <Col xs={1} />
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="coveredSurface"
                    label="Superficie cubiertaf"
                  />
                </div>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="ambiences"
                    label="Cantidad de ambientes"
                  />
                </div>
              </Col>
              <Col xs={1} />
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="rooms"
                    label="Cantidad de habitaciones"
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
                  />
                </div>
              </Col>
              <Col xs={1} />
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput name="toilets" label="Toilettes" />
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
                  />
                </div>
              </Col>
              <Col xs={1} />
              <Col xs={7}>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextInput
                    name="constructionYear"
                    label="Año de construccion"
                  />
                </div>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <div className={styles.inputContainer}>
                  <Select
                    name={"style"}
                    placeholder={"Estilo"}
                    options={propStyles}
                    onSelect={(id) =>
                      dispatch(actions.createPropertyForm.setStyle(id))
                    }
                  />
                </div>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <div className={styles.inputContainer}>
                  <CharacteristicsTextArea
                    name="parkDescription"
                    placeholder={"Caracteristicas del parque"}
                  />
                </div>
              </Col>
            </Form.Row>
          </Col>
        </Form.Row>
        <StepButtons type={"submit"} />
      </CustomForm>
    </Container>
  );
};

const propStyles = [
  "Colonial",
  "askdf",
  "adsgasgaf",
  "sagasfko",
  "aksdjnf",
].map((displayName, id) => ({ displayName, id }));
