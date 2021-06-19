import { CustomForm } from "../../formsEdit/customForm/CustomForm";
import { useCustomForm } from "../../../hooks/useCustomForm";
import * as yup from "yup";
import { Col, Container, Form } from "react-bootstrap";
import { createCustomTextInput } from "../../formsEdit/customForm/TextInput";
import { RadioOption } from "../../formsEdit/ComposedRadioInput";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import {
  selectOperationType,
  Step,
} from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import { RadioInput } from "../../formsEdit/RadioInput";
import styles from "./BasicInfo.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { StepButtons } from "../StepButtons/StepButtons";
import { useFetchPropertyTypes } from "../../../api/propertyOptionals";

const schema = yup.object({
  price: yup.number().positive().required(),
  expenses: yup.number().positive().required(),
  title: yup.string().required(),
});

export type BasicInfoFormData = yup.InferType<typeof schema>;

const BasicInfoTextInput = createCustomTextInput<BasicInfoFormData>();

export const BasicInfo = (props: any) => {
  const defaults = useAppSelector(
    ({ createPropertyForm: { basicInfo, propertyType } }) => ({
      ...basicInfo,
      type: propertyType,
    })
  );
  const dispatch = useAppDispatch();

  const { data: types } = useFetchPropertyTypes();

  if (defaults.type === undefined && types?.[0] !== undefined) {
    dispatch(actions.createPropertyForm.setPropertyType(types[0]));
  }

  const customForm = useCustomForm<BasicInfoFormData>({
    schema,
    onSubmit: (data) => {
      dispatch(actions.createPropertyForm.setBasicInfo(data));
      dispatch(actions.createPropertyForm.setStep(Step.Address));
    },
  });
  console.log(props.data);
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
                <BasicInfoTextInput
                  name="title"
                  label="Titulo"
                  placeholder={"Increible casa en la playa..."}
                  defaultValue={props.data.data.title}
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Row>
                  <Col>
                    <BasicInfoTextInput
                      name="price"
                      label="Precio (ARS)"
                      defaultValue={props.data.data.price}
                    />
                  </Col>
                  <Col>
                    <BasicInfoTextInput
                      name="expenses"
                      label="Expensas (ARS)"
                      defaultValue={props.data.data.expenses}
                    />
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
                  {types && (
                    <RadioInput
                      items={types}
                      name={"propertyType"}
                      onSelected={(label) => {
                        if (types)
                          dispatch(
                            actions.createPropertyForm.setPropertyType(label)
                          );
                      }}
                      defaultValue={defaults.type}
                    />
                  )}
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

const operationTypes: RadioOption[] = [
  {
    value: "SALE",
    displayName: "Venta",
  },
  {
    value: "RENT",
    displayName: "Alquiler",
  },
];

const OperationTypeRadio = () => {
  const defaultOperationType = useAppSelector(selectOperationType);
  const [currentValue, setCurrentValue] = useState(defaultOperationType);
  const dispatch = useAppDispatch();

  const handleSelect = (value: string) => {
    setCurrentValue(value);
    dispatch(actions.createPropertyForm.setOperationType(value));
  };
  return (
    <>
      <div className={styles.itemContainer}>
        {operationTypes.map(({ displayName, value }) => (
          <div
            key={value}
            className={styles.item}
            onClick={() => handleSelect(value)}
          >
            <span>{displayName}</span>
            <div
              className={clsx(styles.highlighter, {
                [styles.active]: value === currentValue,
              })}
            />
          </div>
        ))}
      </div>
    </>
  );
};
