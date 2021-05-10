import { Button, Col, Form, Jumbotron } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { actions, useAppDispatch, useAppSelector } from "../../store";
import { selectSecurities } from "../../store/slices/createPropetyForm/createPropertyFormSlice";

export const Securities = () => {
  const [error, setError] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const securities = useAppSelector(selectSecurities);

  const onAddSecurity = async () => {
    if (ref?.current?.value) {
      const security = ref.current.value;
      if (securities.includes(security)) {
        setError("Ya esta incluido");
        return;
      }
      error && setError("");
      dispatch(actions.createPropertyForm.addSecurity(security));
      ref.current.value = "";
    }
  };
  return (
    <Jumbotron>
      <h1>Agrega las medidas de seguridad</h1>
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label>Medida</Form.Label>
            <Form.Control ref={ref} isInvalid={!!error} />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Button onClick={onAddSecurity} type="button">
            Agregar Medida
          </Button>
        </Col>
      </Form.Row>
      {securities.map((securities) => (
        <div key={securities}>{securities}</div>
      ))}
    </Jumbotron>
  );
};
