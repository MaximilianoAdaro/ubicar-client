import { CustomForm } from "../../forms/customForm/CustomForm";
import { useCustomForm } from "../../../hooks/useCustomForm";
import * as yup from "yup";
import { Col, Container, Form } from "react-bootstrap";
import { createCustomTextInput } from "../../forms/customForm/TextInput";
import { RadioOption } from "../../forms/ComposedRadioInput";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import {
  selectOperationType,
  Step,
} from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import { RadioInput } from "../../forms/RadioInput";
import styles from "./BasicInfo.module.scss";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { StepButtons } from "../StepButtons/StepButtons";
import {
  useGetTypesUsingGET,
  PropertyDTOCondition,
  PropertyType,
} from "../../../api";
import { errorMessages } from "../../../constants";

const schema = yup.object({
  price: yup
    .number()
    .typeError(errorMessages.number)
    .positive(errorMessages.positiveNumber)
    .required(errorMessages.required),
  expenses: yup
    .number()
    .typeError(errorMessages.number)
    .positive(errorMessages.positiveNumber)
    .required(errorMessages.required),
  title: yup.string().required(errorMessages.required),
});

export type BasicInfoFormData = {
  price: number | undefined;
  expenses: number | undefined;
  title: string;
};

const BasicInfoTextInput = createCustomTextInput<BasicInfoFormData>();

type propertyInfo = {
  title: string | undefined;
  price: number | undefined;
  expenses: number | undefined;
  type: PropertyType | undefined;
};

export const BasicInfo = (propertyInfo: propertyInfo) => {
  const defaults = useAppSelector(
    ({ editPropertyForm: { basicInfo, propertyType } }) => ({
      ...basicInfo,
      type: propertyType,
    })
  );

  const dispatch = useAppDispatch();

  const { data: types } = useGetTypesUsingGET();

  useEffect(() => {
    if (defaults.type === undefined && types?.[0] !== undefined) {
      dispatch(actions.editPropertyForm.setPropertyType(types[0]));
    }
  }, [defaults.type, types, dispatch]);

  const customForm = useCustomForm<BasicInfoFormData>({
    schema,
    onSubmit: (data) => {
      dispatch(actions.editPropertyForm.setBasicInfo(data));
      dispatch(actions.editPropertyForm.setStep(Step.Address));
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
                <BasicInfoTextInput
                  name="title"
                  label="Titulo"
                  placeholder={"Increible casa en la playa..."}
                  defaultValue={
                    propertyInfo.title ? propertyInfo.title : defaults.title
                  }
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Row>
                  <Col>
                    <BasicInfoTextInput
                      name="price"
                      label="Precio"
                      defaultValue={
                        propertyInfo.price
                          ? propertyInfo.price.toString()
                          : defaults.price?.toString()
                      }
                      frontSymbol="$"
                    />
                  </Col>
                  <Col>
                    <BasicInfoTextInput
                      name="expenses"
                      label="Expensas"
                      defaultValue={
                        propertyInfo.expenses
                          ? propertyInfo.expenses.toString()
                          : defaults.expenses?.toString()
                      }
                      frontSymbol="$"
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
                            actions.editPropertyForm.setPropertyType(label)
                          );
                      }}
                      defaultValue={
                        propertyInfo.type ? propertyInfo.type : defaults.type
                      }
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
    value: PropertyDTOCondition.SALE,
    displayName: "Venta",
  },
  {
    value: PropertyDTOCondition.RENT,
    displayName: "Alquiler",
  },
];

const OperationTypeRadio = () => {
  const defaultOperationType = useAppSelector(selectOperationType);
  const [currentValue, setCurrentValue] = useState(defaultOperationType);
  const dispatch = useAppDispatch();

  const handleSelect = (value: string) => {
    setCurrentValue(value);
    dispatch(actions.editPropertyForm.setOperationType(value));
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
