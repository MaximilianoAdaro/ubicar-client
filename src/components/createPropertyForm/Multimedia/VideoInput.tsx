import { Badge, Button, Col, Form } from "react-bootstrap";
import { useRef, useState } from "react";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import { selectYoutubeLinks } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import styles from "./VideoInput.module.scss";
import { FiTrash2 } from "react-icons/all";

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

      const json = await res.json();
      console.log(json);
      setError("");
      dispatch(actions.createPropertyForm.addYoutubeLink(link));
      ref.current.value = "";
    }
  };

  const onRemoveVideo = (link: string) => {
    dispatch(actions.createPropertyForm.removeYoutubeLink(link));
  };

  return (
    <div>
      <div className={styles.titleContainer}>
        <h4>Videos</h4>
      </div>
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
          <div className={styles.buttonContainer}>
            <Button onClick={onAddVideo} type="button" variant={"outline-dark"}>
              Agregar video
            </Button>
          </div>
        </Col>
      </Form.Row>
      <div className={styles.linksContainer}>
        {youtubeLinks.map((link) => (
          <Badge key={link} pill className={styles.link}>
            <span>{link}</span>
            <Badge
              pill
              variant={"danger"}
              className={styles.deleteButton}
              onClick={() => onRemoveVideo(link)}
            >
              <FiTrash2 />
            </Badge>
          </Badge>
        ))}
      </div>
    </div>
  );
};
