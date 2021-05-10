import { Button, Col, Form, Jumbotron } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { actions, useAppDispatch, useAppSelector } from "../../store";
import { selectAmenities } from "../../store/slices/createPropetyForm/createPropertyFormSlice";

export const Amenities = () => {
  const [error, setError] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const amenities = useAppSelector(selectAmenities);

  const onAddAmenity = async () => {
    if (ref?.current?.value) {
      const amenity = ref.current.value;
      if (amenities.includes(amenity)) {
        setError("Ya esta incluido");
        return;
      }
      error && setError("");
      dispatch(actions.createPropertyForm.addAmenity(amenity));
      ref.current.value = "";
    }
  };
  return (
    <Jumbotron>
      <h1>Agrega las disponibilidades</h1>
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label>Disponibilidades</Form.Label>
            <Form.Control ref={ref} isInvalid={!!error} />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Button onClick={onAddAmenity} type="button">
            Agregar Disponibilidad
          </Button>
        </Col>
      </Form.Row>
      {amenities.map((amenity) => (
        <div key={amenity}>{amenity}</div>
      ))}
    </Jumbotron>
  );
};
