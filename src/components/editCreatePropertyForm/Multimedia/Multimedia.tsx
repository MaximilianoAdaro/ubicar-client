import { VideoInput } from "./VideoInput";
import { Col, Container, Form, Row } from "react-bootstrap";
import { actions, useAppDispatch } from "../../../store";
import { Step } from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import { StepButtons } from "../StepButtons/StepButtons";
import { Photos } from "./Photos";
import styles from "./Multimedia.module.scss";
import { Grid } from "@material-ui/core";

export const Multimedia = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(actions.editPropertyForm.setStep(Step.Additional));
  };

  const handlePreviousButton = () => {
    dispatch(actions.editPropertyForm.setStep(Step.OptionalInfo));
  };

  const canSave = async () => {
    return true;
  };

  return (
    <Grid className={styles.multimedia_container}>
      <Grid container>
        <Grid xs>
          <Photos />
        </Grid>
        <Grid xs={1} />
        <Grid xs={4}>
          <VideoInput />
        </Grid>
      </Grid>
      <StepButtons
        onNext={handleClick}
        onPrevious={handlePreviousButton}
        canPartialSave={canSave}
      />
    </Grid>
  );
};
