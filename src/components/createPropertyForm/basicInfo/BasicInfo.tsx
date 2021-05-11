import { CustomForm } from "../../forms/CustomForm";
import { useCustomForm } from "../../../hooks/useCustomForm";
import * as yup from "yup";
import { Button, Col, Container, Form } from "react-bootstrap";
import { createCustomTextInput } from "../../forms/TextInput";
import {
  createCustomRadioInput,
  RadioOption,
} from "../../forms/ComposedRadioInput";
import { ChangeEventHandler } from "react";
import { actions, useAppDispatch } from "../../../store";

const schema = yup.object({
  operationType: yup.string().required(),
  price: yup.number().positive().required(),
  expenses: yup.number().positive().required(),
  title: yup.string().required(),
  description: yup.string(),
});

export type BasicInfoFormData = yup.InferType<typeof schema>;

const BasicInfoTextInput = createCustomTextInput<BasicInfoFormData>();
const BasicInfoRadioInput = createCustomRadioInput<BasicInfoFormData>();

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
    onSubmit: (data) => dispatch(actions.createPropertyForm.setBasicInfo(data)),
  });
  return (
    <Container>
      <h4>Informacion basica</h4>
      <CustomForm {...customForm}>
        <Form.Row>
          <Col>
            <BasicInfoRadioInput
              name="operationType"
              options={operationTypes}
            />
            <RadioInputList />
            <Form.Row>
              <Col>
                <BasicInfoTextInput name="price" placeholder="Precio" />
              </Col>
              <Col>
                <BasicInfoTextInput name="expenses" placeholder="Expensas" />
              </Col>
            </Form.Row>
          </Col>
          <Col>
            <BasicInfoTextInput name="title" placeholder="Titulo" />
            <BasicInfoTextInput name="description" placeholder="Descripcion" />
          </Col>
        </Form.Row>
        <Button type="submit">Siguiente</Button>
      </CustomForm>
    </Container>
  );
};

const RadioInputList = () => {
  const dispatch = useAppDispatch();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked, value } = e.target;
    if (checked) dispatch(actions.createPropertyForm.addPropertyType(value));
    else dispatch(actions.createPropertyForm.removePropertyType(value));
  };
  return (
    <>
      {radios.map(({ value, name }) => (
        <Form.Check
          key={value}
          type={"checkbox"}
          label={name}
          value={value}
          onChange={handleChange}
        />
      ))}
    </>
  );
};

interface CheckBoxInputOption {
  value: string;
  name: string;
}

const radios: CheckBoxInputOption[] = [
  { value: "asd", name: "Aasdhf" },
  { value: "ads;hf", name: "asdaaaaaa" },
  { value: "asd fioh", name: "asdf" },
  { value: "alsdbflj oa", name: "asdf" },
  { value: "aaaa", name: "Aasdhf" },
  { value: "aklsdsa", name: "naosdhfpoias" },
  { value: "a ooi oi", name: "akjdsh" },
];
