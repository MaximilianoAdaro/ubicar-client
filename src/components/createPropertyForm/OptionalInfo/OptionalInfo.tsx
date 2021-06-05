import { actions, useAppDispatch, useAppSelector } from "../../../store";
import { CheckInputList } from "../../forms/CheckInputList";
import { Col, Container, Form } from "react-bootstrap";
import { Step } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import styles from "./OptionalInfo.module.scss";
import { StepButtons } from "../StepButtons/StepButtons";
import React from "react";
import {
  useFetchPropertyAmenities,
  useFetchPropertyMaterials,
  useFetchPropertySecurities,
} from "../../../api/property";

export const OptionalInfo = () => {
  const defaults = useAppSelector(
    ({ createPropertyForm: { amenities, securities, materials } }) => ({
      amenities,
      securities,
      materials,
    })
  );
  const dispatch = useAppDispatch();

  const { data: amenities } = useFetchPropertyAmenities();
  const { data: securities } = useFetchPropertySecurities();
  const { data: materials } = useFetchPropertyMaterials();

  const handleClick = () => {
    dispatch(actions.createPropertyForm.setStep(Step.Multimedia));
  };

  const handlePreviousButton = () => {
    dispatch(actions.createPropertyForm.setStep(Step.Characteristics));
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
                  {amenities && (
                    <CheckInputList
                      items={amenities}
                      onCheck={(id) =>
                        dispatch(actions.createPropertyForm.addAmenity(id))
                      }
                      onUncheck={(id) =>
                        dispatch(actions.createPropertyForm.removeAmenity(id))
                      }
                      defaultValues={defaults.amenities}
                    />
                  )}
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
                  {securities && (
                    <CheckInputList
                      items={securities}
                      onCheck={(id) =>
                        dispatch(actions.createPropertyForm.addSecurity(id))
                      }
                      onUncheck={(id) =>
                        dispatch(actions.createPropertyForm.removeSecurity(id))
                      }
                      defaultValues={defaults.securities}
                    />
                  )}
                </div>
              </div>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <div className={styles.constructionContainer}>
                <h3>Materiales de construccion</h3>
                <div className={styles.checkContainer}>
                  {materials && (
                    <CheckInputList
                      items={materials}
                      onCheck={(id) =>
                        dispatch(actions.createPropertyForm.addMaterial(id))
                      }
                      onUncheck={(id) =>
                        dispatch(actions.createPropertyForm.removeMaterial(id))
                      }
                      defaultValues={defaults.materials}
                    />
                  )}
                </div>
              </div>
            </Col>
          </Form.Row>
        </Col>
      </Form.Row>
      <StepButtons
        type={"submit"}
        onNext={handleClick}
        onPrevious={handlePreviousButton}
      />
    </Container>
  );
};
