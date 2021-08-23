import { actions, useAppDispatch, useAppSelector } from "../../../store";
import { CheckInputList } from "../../forms/CheckInputList";
import { Col, Container, Form } from "react-bootstrap";
import { Step } from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import styles from "./OptionalInfo.module.scss";
import { StepButtons } from "../StepButtons/StepButtons";
import {
  useGetAmenitiesUsingGET,
  useGetSecuritiesUsingGET,
  useGetMaterialsUsingGET,
} from "../../../api";

export const OptionalInfo = () => {
  const defaults = useAppSelector(
    ({ editPropertyForm: { amenities, securities, materials } }) => ({
      amenities,
      securities,
      materials,
    })
  );
  const dispatch = useAppDispatch();

  const { data: amenities } = useGetAmenitiesUsingGET();
  const { data: securities } = useGetSecuritiesUsingGET();
  const { data: materials } = useGetMaterialsUsingGET();

  const handleClick = () => {
    dispatch(actions.editPropertyForm.setStep(Step.Multimedia));
  };

  const handlePreviousButton = () => {
    dispatch(actions.editPropertyForm.setStep(Step.Characteristics));
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
                        dispatch(actions.editPropertyForm.addAmenity(id))
                      }
                      onUncheck={(id) =>
                        dispatch(actions.editPropertyForm.removeAmenity(id))
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
                        dispatch(actions.editPropertyForm.addSecurity(id))
                      }
                      onUncheck={(id) =>
                        dispatch(actions.editPropertyForm.removeSecurity(id))
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
                        dispatch(actions.editPropertyForm.addMaterial(id))
                      }
                      onUncheck={(id) =>
                        dispatch(actions.editPropertyForm.removeMaterial(id))
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
