import { Button, Col, Form, Jumbotron } from "react-bootstrap";
import { useRef, useState } from "react";
import { actions, useAppDispatch, useAppSelector } from "../../store";
import { selectContacts } from "../../store/slices/createPropetyForm/createPropertyFormSlice";

export const Contacts = () => {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);

  const onAddContact = async () => {
    if (labelRef?.current?.value && emailRef?.current?.value) {
      const label = labelRef.current.value;
      const email = emailRef.current.value;
      if (contacts.map((c) => c.email).includes(email)) {
        setError("Ya esta incluido");
        return;
      }
      error && setError("");
      dispatch(actions.createPropertyForm.addContact({ label, email }));
      labelRef.current.value = "";
      emailRef.current.value = "";
    }
  };
  return (
    <Jumbotron>
      <h1>Agrega los Contactos</h1>
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label>Etiqueta</Form.Label>
            <Form.Control ref={labelRef} isInvalid={!!error} />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control ref={emailRef} isInvalid={!!error} />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Button onClick={onAddContact} type="button">
            Agregar Contacto
          </Button>
        </Col>
      </Form.Row>
      {contacts.map(({ label, email }) => (
        <div key={email}>
          <span>{label}</span> <span>{email}</span>
        </div>
      ))}
    </Jumbotron>
  );
};
