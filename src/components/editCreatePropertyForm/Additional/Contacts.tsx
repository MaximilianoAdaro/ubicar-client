import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useRef, useState } from "react";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import { selectContacts } from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import styles from "./Contacts.module.scss";
import { FiTrash2 } from "react-icons/all";
import { Grid } from "@material-ui/core";
import clsx from "clsx";

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
      setError("");
      dispatch(actions.editPropertyForm.addContact({ label, email }));
      labelRef.current.value = "";
      emailRef.current.value = "";
    }
  };

  const onRemoveContact = (email: string) => {
    dispatch(actions.editPropertyForm.removeContact(email));
  };
  return (
    <>
      <Grid className={styles.contacts_container}>
        <Grid container className={styles.contacts_buttons_grid}>
          <Grid xs className={styles.contacts_button_subtitle_grid}>
            <span className={styles.contacts_button_grid_span_tags}>
              {" "}
              Contactos{" "}
            </span>
          </Grid>
          <Grid xs className={styles.contacts_button_subtitle_add}>
            <span
              onClick={onAddContact}
              className={clsx(
                styles.contacts_add_button,
                styles.contacts_button_grid_span_tags
              )}
            >
              Agregar
            </span>
          </Grid>
        </Grid>
        <Grid className={styles.contacts_form_control}>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Control
                  ref={labelRef}
                  isInvalid={!!error}
                  placeholder={"Juan Fernandez"}
                />
                <span className={styles.contacts_text_inputs_span}>
                  Agente*
                </span>
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  ref={emailRef}
                  isInvalid={!!error}
                  placeholder={"Ej: juan.fernandez@gmail.com"}
                />
                <span className={styles.contacts_text_inputs_span}>Email*</span>
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/*<Col xs={2}>*/}
            {/*  <Button*/}
            {/*      onClick={onAddContact}*/}
            {/*      type="button"*/}
            {/*      variant={"outline-dark"}*/}
            {/*      className={styles.button}*/}
            {/*  >*/}
            {/*    +*/}
            {/*  </Button>*/}
            {/*</Col>*/}
          </Form.Row>
          <Row>
            <Col>
              {contacts.map(({ label, email }) => (
                <Card key={email} className={styles.card}>
                  <Card.Body className={styles.cardBody}>
                    <div>
                      <div>
                        <Card.Title>{label}</Card.Title>
                        <Card.Subtitle className="text-muted">
                          {email}
                        </Card.Subtitle>
                      </div>
                    </div>
                  </Card.Body>
                  <div className={styles.deleteButtonContainer}>
                    <FiTrash2 onClick={() => onRemoveContact(email)} />
                  </div>
                </Card>
              ))}
            </Col>
            <Col xs={2} />
          </Row>
        </Grid>
      </Grid>
      {/*<div className={styles.titleContainer}>*/}
      {/*  <h4>Contactos</h4>*/}
      {/*</div>*/}
      {/*<Form.Row>*/}
      {/*  <Col>*/}
      {/*    <Form.Group>*/}
      {/*      <Form.Control*/}
      {/*        ref={labelRef}*/}
      {/*        isInvalid={!!error}*/}
      {/*        placeholder={"Agente"}*/}
      {/*      />*/}
      {/*      <Form.Control.Feedback type="invalid">*/}
      {/*        {error}*/}
      {/*      </Form.Control.Feedback>*/}
      {/*    </Form.Group>*/}
      {/*    <Form.Group>*/}
      {/*      <Form.Control*/}
      {/*        ref={emailRef}*/}
      {/*        isInvalid={!!error}*/}
      {/*        placeholder={"Email"}*/}
      {/*      />*/}
      {/*      <Form.Control.Feedback type="invalid">*/}
      {/*        {error}*/}
      {/*      </Form.Control.Feedback>*/}
      {/*    </Form.Group>*/}
      {/*  </Col>*/}
      {/*  <Col xs={2}>*/}
      {/*    <Button*/}
      {/*      onClick={onAddContact}*/}
      {/*      type="button"*/}
      {/*      variant={"outline-dark"}*/}
      {/*      className={styles.button}*/}
      {/*    >*/}
      {/*      +*/}
      {/*    </Button>*/}
      {/*  </Col>*/}
      {/*</Form.Row>*/}
      {/*<Row>*/}
      {/*  <Col>*/}
      {/*    {contacts.map(({ label, email }) => (*/}
      {/*      <Card key={email} className={styles.card}>*/}
      {/*        <Card.Body className={styles.cardBody}>*/}
      {/*          <div>*/}
      {/*            <div>*/}
      {/*              <Card.Title>{label}</Card.Title>*/}
      {/*              <Card.Subtitle className="text-muted">*/}
      {/*                {email}*/}
      {/*              </Card.Subtitle>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </Card.Body>*/}
      {/*        <div className={styles.deleteButtonContainer}>*/}
      {/*          <FiTrash2 onClick={() => onRemoveContact(email)} />*/}
      {/*        </div>*/}
      {/*      </Card>*/}
      {/*    ))}*/}
      {/*  </Col>*/}
      {/*  <Col xs={2} />*/}
      {/*</Row>*/}
    </>
  );
};
