import { CustomForm } from "../../forms/customForm/CustomForm";
import { useCustomForm } from "../../../hooks/useCustomForm";
import * as yup from "yup";
import { Col, Container, Form } from "react-bootstrap";
import { createCustomTextInput } from "../../forms/customForm/TextInput";
import { Step } from "../../../store/slices/editPropertyForm/editPropertyFormSlice";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import { Select } from "../../forms/Select";
import React, { useEffect } from "react";
import { StepButtons } from "../StepButtons/StepButtons";

import styles from "./Address.module.scss";
import {
  useGetCitiesUsingGET,
  useGetStatesUsingGET,
  useGetTownsUsingGET,
} from "../../../api/generated/location-controller/location-controller";

const requiredMessage = "Este campo es requerido";

const schema = yup.object({
  postalCode: yup.string().required(requiredMessage),
  street: yup.string().required(requiredMessage),
  number: yup.number().required(requiredMessage),
  department: yup.string().required(requiredMessage),
});

export type AddressFormData = yup.InferType<typeof schema>;

const AddressTextInput = createCustomTextInput<AddressFormData>();

export const Address = () => {
  const defaults = useAppSelector(
    ({ editPropertyForm: { address, addressDropdowns } }) => ({
      ...addressDropdowns,
      ...address,
    })
  );
  const dispatch = useAppDispatch();
  console.log(defaults);
  const { data: states } = useGetStatesUsingGET();
  const { data: cities } = useGetCitiesUsingGET(defaults.state as any);
  const { data: towns } = useGetTownsUsingGET(defaults.city as any);

  useEffect(() => {
    if (defaults.state === undefined && states?.[0]?.id !== undefined) {
      dispatch(actions.editPropertyForm.setState(states[0]?.id));
    }
  }, [defaults.state, states, dispatch]);

  useEffect(() => {
    if (defaults.city === undefined && cities?.[0]?.id !== undefined) {
      dispatch(actions.editPropertyForm.setCity(cities[0]?.id));
    }
  }, [defaults.city, cities, dispatch]);

  useEffect(() => {
    if (defaults.town === undefined && towns?.[0]?.id !== undefined) {
      dispatch(actions.editPropertyForm.setTown(towns[0]?.id));
    }
  }, [defaults.town, towns, dispatch]);

  const customForm = useCustomForm<AddressFormData>({
    schema,
    onSubmit: (data) => {
      dispatch(actions.editPropertyForm.setAddress(data));
      dispatch(actions.editPropertyForm.setStep(Step.Characteristics));
    },
  });

  const handlePreviousButton = async () => {
    const isValid = await customForm.methods.trigger();
    if (isValid) {
      const data = customForm.methods.getValues();
      dispatch(actions.editPropertyForm.setAddress(data));
      dispatch(actions.editPropertyForm.setStep(Step.BasicInfo));
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
                  {states && (
                    <Select
                      name="state"
                      placeholder="Provincia"
                      options={states}
                      onSelect={(id) => {
                        dispatch(actions.editPropertyForm.setState(id));
                        dispatch(actions.editPropertyForm.setCity(undefined));
                        dispatch(actions.editPropertyForm.setTown(undefined));
                      }}
                      defaultValue={defaults.state}
                    />
                  )}
                </div>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <div className={styles.input}>
                  {cities && (
                    <Select
                      name="city"
                      placeholder="Ciudad"
                      options={cities}
                      onSelect={(id) => {
                        dispatch(actions.editPropertyForm.setCity(id));
                        dispatch(actions.editPropertyForm.setTown(undefined));
                      }}
                      defaultValue={defaults.city}
                    />
                  )}
                </div>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <div className={styles.input}>
                  {towns && (
                    <Select
                      name="town"
                      placeholder="Barrio"
                      options={towns}
                      onSelect={(id) =>
                        dispatch(actions.editPropertyForm.setTown(id))
                      }
                      defaultValue={defaults.town}
                    />
                  )}
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
                    defaultValue={defaults.number.toString()}
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
