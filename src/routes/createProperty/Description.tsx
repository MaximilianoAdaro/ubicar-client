import { Col, Form } from "react-bootstrap";
import {
  CreatePropertySelectInput,
  CreatePropertyTextInput,
} from "./createPropertyFormInputs";
import React from "react";

export const Description = () => {
  return (
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
  );
};
