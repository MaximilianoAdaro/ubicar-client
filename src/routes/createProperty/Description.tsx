import { Col, Form, Jumbotron } from "react-bootstrap";
import {
  CreatePropertySelectInput,
  CreatePropertyTextInput,
} from "./createPropertyFormInputs";

export const Description = () => {
  return (
    <Jumbotron>
      <h4>Descripcion</h4>
      <Form.Row>
        <Col>
          <CreatePropertyTextInput name="title" placeholder="Titulo" />
        </Col>
        <Col>
          <CreatePropertyTextInput name="style" placeholder="Estilo" />
        </Col>
        <Col>
          <CreatePropertySelectInput
            name="condition"
            placeholder="Condicion"
            options={[
              { value: "sale", displayName: "Venta" },
              { value: "rental", displayName: "Alquiler" },
            ]}
          />
        </Col>
      </Form.Row>
    </Jumbotron>
  );
};
