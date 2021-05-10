import { Button, Col, Form, Jumbotron } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { actions, useAppDispatch, useAppSelector } from "../../store";
import { selectMaterials } from "../../store/slices/createPropetyForm/createPropertyFormSlice";

export const Materials = () => {
  const [error, setError] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const materials = useAppSelector(selectMaterials);

  const onAddMaterial = async () => {
    if (ref?.current?.value) {
      const material = ref.current.value;
      if (materials.includes(material)) {
        setError("Ya esta incluido");
        return;
      }
      error && setError("");
      dispatch(actions.createPropertyForm.addMaterial(material));
      ref.current.value = "";
    }
  };
  return (
    <Jumbotron>
      <h1>Agrega los materiales de construccion</h1>
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label>Materiales</Form.Label>
            <Form.Control ref={ref} isInvalid={!!error} />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Button onClick={onAddMaterial} type="button">
            Agregar Material
          </Button>
        </Col>
      </Form.Row>
      {materials.map((material) => (
        <div key={material}>{material}</div>
      ))}
    </Jumbotron>
  );
};
