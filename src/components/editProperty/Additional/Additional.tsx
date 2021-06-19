import { Contacts } from "./Contacts";
import * as yup from "yup";
import { useCustomForm } from "../../../hooks/useCustomForm";
import { createCustomTextInputArea } from "../../forms/customForm/TextAreaInput";
import { CustomForm } from "../../forms/customForm/CustomForm";
import { Col, Container, Form } from "react-bootstrap";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import { Step } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import { StepButtons } from "../StepButtons/StepButtons";
import styles from "./Additional.module.scss";
import { OpenHouse } from "./OpenHouse";

const schema = yup.object({
  description: yup.string(),
});

export type AdditionalFormData = yup.InferType<typeof schema>;

const AdditionalTextArea = createCustomTextInputArea<AdditionalFormData>();

export const Additional = (props: any) => {
  const defaults = useAppSelector(
    ({
      createPropertyForm: {
        additional: { description },
      },
    }) => ({
      description,
    })
  );
  const dispatch = useAppDispatch();
  const customForm = useCustomForm<AdditionalFormData>({
    schema,
    onSubmit: (data) => {
      dispatch(actions.createPropertyForm.setAdditional(data));
      dispatch(actions.createPropertyForm.setStep(Step.Confirmation));
    },
  });

  const handlePreviousButton = () => {
    dispatch(actions.createPropertyForm.setStep(Step.Multimedia));
  };

  return (
    <Container>
      <CustomForm {...customForm}>
        <Form.Row>
          <Col>
            <Contacts />
          </Col>
          <Col>
            <OpenHouse />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className={styles.textContainer}>
            <h5>Contanos qué amas de esta propiedad, ¿qué la hace única...?</h5>
            <AdditionalTextArea
              name="description"
              defaultValue={defaults.description}
            />
          </Col>
        </Form.Row>
        <StepButtons type={"submit"} onPrevious={handlePreviousButton} />
      </CustomForm>
    </Container>
  );
};
