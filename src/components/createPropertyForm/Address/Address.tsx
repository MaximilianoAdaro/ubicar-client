import { CustomForm } from "../../forms/customForm/CustomForm";
import { useCustomForm } from "../../../hooks/useCustomForm";
import * as yup from "yup";
import { Col, Container, Form } from "react-bootstrap";
import { createCustomTextInput } from "../../forms/customForm/TextInput";
import { Step } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import { Select } from "../../forms/Select";
import React from "react";
import { StepButtons } from "../StepButtons/StepButtons";

import styles from "./Address.module.scss";

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
  const { defaults } = useAppSelector(
    ({ createPropertyForm: { address, addressDropdowns } }) => ({
      defaults: {
        state: addressDropdowns.state,
        city: addressDropdowns.city,
        town: addressDropdowns.town,
        postalCode: address.postalCode,
        street: address.street,
        number: address.number,
        department: address.department,
      },
    })
  );
  const dispatch = useAppDispatch();
  const customForm = useCustomForm<AddressFormData>({
    schema,
    onSubmit: (data) => {
      dispatch(actions.createPropertyForm.setAddress(data));
      dispatch(actions.createPropertyForm.setStep(Step.Characteristics));
    },
  });

  const handlePreviousButton = async () => {
    const isValid = await customForm.methods.trigger();
    if (isValid) {
      const data = customForm.methods.getValues();
      dispatch(actions.createPropertyForm.setAddress(data));
      dispatch(actions.createPropertyForm.setStep(Step.BasicInfo));
    }
  };

  return (
    <Container>
      <CustomForm {...customForm}>
        <Form.Row>
          <Col>
            <Form.Row>
              <Col>
                <div className={styles.input}>
                  <Form.Group>
                    <Form.Label>{"Pais"}</Form.Label>
                    <Form.Control type={"text"} value={"Argentina"} disabled />
                  </Form.Group>
                </div>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <div className={styles.input}>
                  <Select
                    name="state"
                    placeholder="Provincia"
                    options={states}
                    onSelect={(id) =>
                      dispatch(actions.createPropertyForm.setState(id))
                    }
                    defaultValue={defaults.state}
                  />
                </div>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <div className={styles.input}>
                  <Select
                    name="city"
                    placeholder="Ciudad"
                    options={cities}
                    onSelect={(id) =>
                      dispatch(actions.createPropertyForm.setCity(id))
                    }
                    defaultValue={defaults.city}
                  />
                </div>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <div className={styles.input}>
                  <Select
                    name="town"
                    placeholder="Barrio"
                    options={towns}
                    onSelect={(id) =>
                      dispatch(actions.createPropertyForm.setTown(id))
                    }
                    defaultValue={defaults.town}
                  />
                </div>
              </Col>
            </Form.Row>
          </Col>
          <Col xs={2} />
          <Col>
            <Form.Row>
              <Col>
                <div className={styles.input}>
                  <AddressTextInput
                    name="postalCode"
                    label="Codigo postal"
                    defaultValue={defaults.postalCode}
                  />
                </div>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <div className={styles.input}>
                  <AddressTextInput
                    name="street"
                    label="Calle"
                    defaultValue={defaults.street}
                  />
                </div>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <div className={styles.input}>
                  <AddressTextInput
                    name="number"
                    label="Numero"
                    defaultValue={defaults.number}
                  />
                </div>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <div className={styles.input}>
                  <AddressTextInput
                    name="department"
                    label="Departamento"
                    defaultValue={defaults.department}
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
