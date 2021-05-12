import { CustomForm } from "../../forms/customForm/CustomForm";
import { useCustomForm } from "../../../hooks/useCustomForm";
import * as yup from "yup";
import { Col, Container, Form } from "react-bootstrap";
import { createCustomTextInput } from "../../forms/customForm/TextInput";
import { Step } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import { actions, useAppDispatch } from "../../../store";
import { Select } from "../../forms/Select";
import React from "react";
import { StepButtons } from "../StepButtons/StepButtons";

const requiredMessage = "Este campo es requerido";

const schema = yup.object({
  postalCode: yup.string().required(requiredMessage),
  street: yup.string().required(requiredMessage),
  number: yup.string().required(requiredMessage),
  department: yup.string().required(requiredMessage),
});

export type AddressFormData = yup.InferType<typeof schema>;

const AddressTextInput = createCustomTextInput<AddressFormData>();

export const Address = () => {
  const dispatch = useAppDispatch();
  const customForm = useCustomForm<AddressFormData>({
    schema,
    onSubmit: (data) => {
      dispatch(actions.createPropertyForm.setAddress(data));
      dispatch(actions.createPropertyForm.setStep(Step.Characteristics));
    },
  });

  return (
    <Container>
      <CustomForm {...customForm}>
        <Form.Row>
          <Col>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>{"Pais"}</Form.Label>
                  <Form.Control type={"text"} value={"Argentina"} disabled />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <Select
                  name="state"
                  placeholder="Provincia"
                  options={states}
                  onSelect={(id) =>
                    dispatch(actions.createPropertyForm.setState(id))
                  }
                />
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <Select
                  name="city"
                  placeholder="Ciudad"
                  options={cities}
                  onSelect={(id) =>
                    dispatch(actions.createPropertyForm.setCity(id))
                  }
                />
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <Select
                  name="town"
                  placeholder="Barrio"
                  options={towns}
                  onSelect={(id) =>
                    dispatch(actions.createPropertyForm.setTown(id))
                  }
                />
              </Col>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Col>
                <AddressTextInput
                  name="postalCode"
                  placeholder="Codigo postal"
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <AddressTextInput name="street" placeholder="Calle" />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <AddressTextInput name="number" placeholder="Numero" />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <AddressTextInput
                  name="department"
                  placeholder="Departamento"
                />
              </Col>
            </Form.Row>
          </Col>
        </Form.Row>
        <StepButtons type={"submit"} />
      </CustomForm>
    </Container>
  );
};

const states = [
  { id: 1, displayName: "Buenos Aires" },
  { id: 2, displayName: "Salta - Jujuy" },
  { id: 3, displayName: "Rosario" },
  { id: 4, displayName: "Santa Fé" },
  { id: 5, displayName: "Córdoba" },
  { id: 6, displayName: "Mendoza" },
  { id: 7, displayName: "Mar del Plata" },
];

const cities = [
  { id: 8, displayName: "Ciudad Autónoma de Buenos Aires", state_id: 1 },
  { id: 9, displayName: "GBA Norte", state_id: 1 },
  { id: 10, displayName: "GBA Sur", state_id: 1 },
  { id: 11, displayName: "GBA Oeste", state_id: 1 },
  { id: 12, displayName: "Provincia (Bs. As)", state_id: 1 },
];

const towns = [
  { id: 13, displayName: "Belgrano", city_id: 8 },
  { id: 14, displayName: "Caballito", city_id: 8 },
  { id: 15, displayName: "Colegiales", city_id: 8 },
  { id: 16, displayName: "Recoleta", city_id: 8 },
  { id: 17, displayName: "Retiro", city_id: 8 },
];
