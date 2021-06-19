import { VideoInput } from "./VideoInput";
import { Col, Container, Row } from "react-bootstrap";
import { actions, useAppDispatch } from "../../../store";
import { Step } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import { StepButtons } from "../StepButtons/StepButtons";
import { Photos } from "./Photos";
import styles from "./Multimedia.module.scss";

export const Multimedia = (props: any) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(actions.createPropertyForm.setStep(Step.Additional));
  };

  const handlePreviousButton = () => {
    dispatch(actions.createPropertyForm.setStep(Step.OptionalInfo));
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className={styles.container}>
            <Photos />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles.container}>
            <VideoInput />
          </div>
        </Col>
      </Row>
      <StepButtons onNext={handleClick} onPrevious={handlePreviousButton} />
    </Container>
  );
};
