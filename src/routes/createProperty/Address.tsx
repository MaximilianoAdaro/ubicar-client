import { CreatePropertyTextInput } from "./createPropertyFormInputs";
import { Col, Form, Jumbotron } from "react-bootstrap";

export const Address = () => (
  <Jumbotron>
    <h4>Ubicacion</h4>
    <Form.Row>
      <Col>
        <CreatePropertyTextInput name="address.country" placeholder="Pais" />
      </Col>
      <Col>
        <CreatePropertyTextInput name="address.state" placeholder="Provincia" />
      </Col>
    </Form.Row>

    <Form.Row>
      <Col>
        <CreatePropertyTextInput name="address.city" placeholder="Ciudad" />
      </Col>
      <Col>
        <CreatePropertyTextInput
          name="address.neighbourhood"
          placeholder="Barrio"
        />
      </Col>
    </Form.Row>

    <Form.Row>
      <Col>
        <CreatePropertyTextInput name="address.street" placeholder="Calle" />
      </Col>
      <Col>
        <CreatePropertyTextInput name="address.number" placeholder="Numero" />
      </Col>
    </Form.Row>

    <Form.Row>
      <Col>
        <CreatePropertyTextInput
          name="address.postalCode"
          placeholder="Codigo postal"
        />{" "}
      </Col>
      <Col>
        <CreatePropertyTextInput
          name="address.department"
          placeholder="Departamento"
        />
      </Col>
    </Form.Row>
  </Jumbotron>
);
