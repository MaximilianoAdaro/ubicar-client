import { Button, Col, Form, Jumbotron } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { actions, useAppDispatch, useAppSelector } from "../../store";
import { selectYoutubeLinks } from "../../store/slices/createPropetyForm/createPropertyFormSlice";

export const VideoInput = () => {
  const [error, setError] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const youtubeLinks = useAppSelector(selectYoutubeLinks);

  const onAddVideo = async () => {
    if (ref?.current?.value) {
      const link = ref.current.value;
      if (youtubeLinks.includes(link)) {
        setError("El video ya esta incluido");
        return;
      }
      const res = await fetch(
        `https://www.youtube.com/oembed?format=json&url=${link}`
      );
      if (!res.ok) {
        setError("El video no existe");
        return;
      }
      setError("");
      dispatch(actions.createPropertyForm.addYoutubeLink(link));
      ref.current.value = "";
    }
  };
  return (
    <Jumbotron>
      <h1>Videos</h1>
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label>Link de Youtube</Form.Label>
            <Form.Control ref={ref} isInvalid={!!error} />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Button onClick={onAddVideo} type="button">
            Agregar video
          </Button>
        </Col>
      </Form.Row>
      {youtubeLinks.map((link) => (
        <div key={link}>{link}</div>
      ))}
    </Jumbotron>
  );
};
