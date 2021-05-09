import { Col, Form, Jumbotron } from "react-bootstrap";
import { CreatePropertyTextInput } from "./createPropertyFormInputs";

export const Price = () => (
  <Jumbotron>
    <h4>Precio</h4>
    <Form.Row>
      <Col>
        <CreatePropertyTextInput name="price" placeholder="Precio" />
      </Col>
      <Col>
        <CreatePropertyTextInput
          name="expenses"
          placeholder="Precio de expensas"
        />
      </Col>
    </Form.Row>
  </Jumbotron>
);
