import { CustomForm } from "../../forms/customForm/CustomForm";
import { useCustomForm } from "../../../hooks/useCustomForm";
import * as yup from "yup";
import { Button, Col, Container, Form } from "react-bootstrap";
import { createCustomTextInput } from "../../forms/customForm/TextInput";
import {
  createCustomRadioInput,
  RadioOption,
} from "../../forms/ComposedRadioInput";
import { ChangeEventHandler } from "react";
import { actions, useAppDispatch } from "../../../store";
import { Step } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";

const schema = yup.object({
  operationType: yup.string().required(),
  price: yup.number().positive().required(),
  expenses: yup.number().positive().required(),
  title: yup.string().required(),
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
            <Form.Row>
              <Col>
                <h4>Tipo de operacion</h4>
              </Col>
              <Col>
                <BasicInfoRadioInput
                  name="operationType"
                  options={operationTypes}
                />
              </Col>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Col>
                <BasicInfoTextInput name="title" placeholder="Titulo" />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Row>
                  <Col>
                    <BasicInfoTextInput name="price" placeholder="Precio" />
                  </Col>
                  <Col>
                    <BasicInfoTextInput
                      name="expenses"
                      placeholder="Expensas"
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
                <RadioInputList
                  items={radios}
                  name={"propertyType"}
                  onSelected={(id) =>
                    dispatch(actions.createPropertyForm.setPropertyType(id))
                  }
                />
              </Col>
            </Form.Row>
          </Col>
        </Form.Row>
        <Button type="submit">Siguiente</Button>
      </CustomForm>
    </Container>
  );
};

interface RadioInputOption {
  id: number;
  label: string;
}

interface RadioInputListProps {
  items: RadioInputOption[];
  onSelected: (id: RadioInputOption["id"]) => void;
  name: string;
}

const RadioInputList = ({ items, name, onSelected }: RadioInputListProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e);
    const { checked, value: id } = e.target;
    if (checked) onSelected(Number(id));
  };
  return (
    <div>
      {items.map(({ id, label }) => (
        <Form.Check
          key={id}
          id={`${name}-radio-${id}`}
          type={"radio"}
          label={label}
          value={id}
          name={name}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

const radios: RadioInputOption[] = [
  "Casa",
  "Departamento",
  "Cabaña",
  "Quinta",
  "Oficina",
  "Edificio",
  "Cochera",
  "Galpon",
].map((name, id) => ({ label: name, id }));
