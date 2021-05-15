import { actions, useAppDispatch } from "../../../store";
import { CheckInputList } from "../../forms/CheckInputList";
import { Col, Container, Form } from "react-bootstrap";
import { Step } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import styles from "./OptionalInfo.module.scss";
import { StepButtons } from "../StepButtons/StepButtons";
import React from "react";

const amenities = [
  "Lavaplatos",
  "Lavarropas",
  "Lavarropas",
  "Secarropas",
  "Secarropas",
  "Secarropas",
  "Secarropas",
  "Aire Acondicionado",
  "Aire Acondicionado",
  "Aire Acondicionado",
  "Aire Acondicionado",
  "Calefaccion",
  "Calefaccion",
  "Calefaccion",
  "Calefaccion",
].map((name, id) => ({ name, id }));

const securities = [
  "Rejas",
  "Rejas",
  "Rejas",
  "Camaras",
  "Camaras",
  "Camaras",
  "Alarmas",
  "Alarmas",
  "Alarmas",
].map((name, id) => ({ name, id }));

const materials = [
  "Ladrillo",
  "Ladrillo",
  "Cemento",
  "Cemento",
  "Cemento",
  "Chapa",
  "Chapa",
].map((name, id) => ({ name, id }));

export const OptionalInfo = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(actions.createPropertyForm.setStep(Step.Multimedia));
  };

  return (
    <Container>
      <Form.Row>
        <Col xs={7}>
          <Form.Row>
            <Col>
              <div>
                <h3>Servicio</h3>
                <div className={styles.checkContainer}>
                  <CheckInputList
                    items={amenities}
                    onCheck={(id) =>
                      dispatch(actions.createPropertyForm.addAmenity(id))
                    }
                    onUncheck={(id) =>
                      dispatch(actions.createPropertyForm.removeAmenity(id))
                    }
                  />
                </div>
              </div>
            </Col>
          </Form.Row>
        </Col>
        <Col>
          <Form.Row>
            <Col>
              <div>
                <h3>Medidas de seguridad</h3>
                <div className={styles.checkContainer}>
                  <CheckInputList
                    items={securities}
                    onCheck={(id) =>
                      dispatch(actions.createPropertyForm.addSecurity(id))
                    }
                    onUncheck={(id) =>
                      dispatch(actions.createPropertyForm.removeSecurity(id))
                    }
                  />
                </div>
              </div>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <div className={styles.constructionContainer}>
                <h3>Materiales de construccion</h3>
                <div className={styles.checkContainer}>
                  <CheckInputList
                    items={materials}
                    onCheck={(id) =>
                      dispatch(actions.createPropertyForm.addMaterial(id))
                    }
                    onUncheck={(id) =>
                      dispatch(actions.createPropertyForm.removeMaterial(id))
                    }
                  />
                </div>
              </div>
            </Col>
          </Form.Row>
        </Col>
      </Form.Row>
      <StepButtons type={"submit"} onNext={handleClick} />
    </Container>
  );
};
