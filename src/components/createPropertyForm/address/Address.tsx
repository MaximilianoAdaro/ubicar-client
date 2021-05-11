import { CustomForm } from "../../forms/CustomForm";
import { useCustomForm } from "../../../hooks/useCustomForm";
import * as yup from "yup";
import { Button, Col, Form } from "react-bootstrap";
import { createCustomTextInput } from "../../forms/TextInput";
import { AddressFormData } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import { actions, useAppDispatch } from "../../../store";

const requiredMessage = "Este campo es requerido";

const schema = yup.object({
  country: yup.string().required(requiredMessage),
  state: yup.string().required(requiredMessage),
  city: yup.string().required(requiredMessage),
  neighbourhood: yup.string().required(requiredMessage),
  postalCode: yup.string().required(requiredMessage),
  street: yup.string().required(requiredMessage),
  number: yup.string().required(requiredMessage),
  department: yup.string().required(requiredMessage),
});

const AddressTextInput = createCustomTextInput<AddressFormData>();

export const Address = () => {
  const dispatch = useAppDispatch();
  const customForm = useCustomForm<AddressFormData>({
    schema,
    onSubmit: (data) => dispatch(actions.createPropertyForm.setAddress(data)),
  });

  return (
    <CustomForm {...customForm}>
      <h4>Ubicacion</h4>
      <Form.Row>
        <Col>
          <AddressTextInput name="country" placeholder="Pais" />
        </Col>
        <Col>
          <AddressTextInput name="state" placeholder="Provincia" />
        </Col>
      </Form.Row>

      <Form.Row>
        <Col>
          <AddressTextInput name="city" placeholder="Ciudad" />
        </Col>
        <Col>
          <AddressTextInput name="neighbourhood" placeholder="Barrio" />
        </Col>
      </Form.Row>

      <Form.Row>
        <Col>
          <AddressTextInput name="street" placeholder="Calle" />
        </Col>
        <Col>
          <AddressTextInput name="number" placeholder="Numero" />
        </Col>
      </Form.Row>

      <Form.Row>
        <Col>
          <AddressTextInput name="postalCode" placeholder="Codigo postal" />
        </Col>
        <Col>
          <AddressTextInput name="department" placeholder="Departamento" />
        </Col>
      </Form.Row>
      <Button type={"submit"}>Siguiente paso</Button>
    </CustomForm>
  );
};
