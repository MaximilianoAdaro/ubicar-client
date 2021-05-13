import { CustomForm } from "../../forms/customForm/CustomForm";
import { useCustomForm } from "../../../hooks/useCustomForm";
import * as yup from "yup";
import { Col, Container, Form } from "react-bootstrap";
import { createCustomTextInput } from "../../forms/customForm/TextInput";
import { RadioOption } from "../../forms/ComposedRadioInput";
import { actions, useAppDispatch } from "../../../store";
import { Step } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import { RadioInput, RadioInputOption } from "../../forms/RadioInput";
import styles from "./BasicInfo.module.scss";
import classNames from "classnames";
import { useState } from "react";
import { StepButtons } from "../StepButtons/StepButtons";

const schema = yup.object({
  price: yup.number().positive().required(),
  expenses: yup.number().positive().required(),
  title: yup.string().required(),
});

export type BasicInfoFormData = yup.InferType<typeof schema>;

const BasicInfoTextInput = createCustomTextInput<BasicInfoFormData>();

const operationTypes: RadioOption[] = [
  {
    value: "SALE",
    displayName: "Venta",
  },
  {
    value: "RENTAL",
    displayName: "Alquiler",
  },
];

export const BasicInfo = () => {
  const dispatch = useAppDispatch();
  const customForm = useCustomForm<BasicInfoFormData>({
    schema,
    onSubmit: (data) => {
      dispatch(actions.createPropertyForm.setBasicInfo(data));
      dispatch(actions.createPropertyForm.setStep(Step.Address));
    },
  });
  return (
    <Container>
      <CustomForm {...customForm}>
        <Form.Row>
          <Col>
            <div className={styles.operationTypeContainer}>
              <Form.Row>
                <Col>
                  <h3>Tipo de operacion</h3>
                </Col>
                <Col>
                  <OperationTypeRadio />
                </Col>
              </Form.Row>
            </div>
          </Col>
          <Col>
            <Form.Row>
              <Col>
                <BasicInfoTextInput name="title" label="Titulo" />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Row>
                  <Col>
                    <BasicInfoTextInput name="price" label="Precio" />
                  </Col>
                  <Col>
                    <BasicInfoTextInput name="expenses" label="Expensas" />
                  </Col>
                </Form.Row>
              </Col>
            </Form.Row>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Row>
              <Col>
                <h3>Tipo de inmueble</h3>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <div className={styles.typeContainer}>
                  <RadioInput
                    items={radios}
                    name={"propertyType"}
                    onSelected={(id) =>
                      dispatch(actions.createPropertyForm.setPropertyType(id))
                    }
                  />
                </div>
              </Col>
            </Form.Row>
          </Col>
        </Form.Row>
        <Form.Row>
          <StepButtons type={"submit"} showPrevious={false} />
        </Form.Row>
      </CustomForm>
    </Container>
  );
};

const OperationTypeRadio = () => {
  const [currentValue, setCurrentValue] = useState(operationTypes[0].value);
  const dispatch = useAppDispatch();

  const handleSelect = (value: string) => {
    setCurrentValue(value);
    dispatch(actions.createPropertyForm.setOperationType(value));
  };
  return (
    <>
      <div className={styles.itemContainer}>
        {operationTypes.map(({ displayName, value }) => (
          <div className={styles.item} onClick={() => handleSelect(value)}>
            <span>{displayName}</span>
            <div
              className={classNames(styles.highlighter, {
                [styles.active]: value === currentValue,
              })}
            />
          </div>
        ))}
      </div>
    </>
  );
};

const radios: RadioInputOption[] = [
  "Casa",
  "Departamento",
  "Cabaña",
  "Quinta",
  "Oficina",
  "Edificio",
  "Edificio",
  "Edificio",
  "Edificio",
  "Edificio",
  "Edificio",
  "Edificio",
  "Edificio",
  "Edificio",
  "Edificio",
  "Cochera",
  "Galpon",
].map((name, id) => ({ label: name, id }));
