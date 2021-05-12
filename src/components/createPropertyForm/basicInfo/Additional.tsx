import { Contacts } from "./Contacts";
import * as yup from "yup";
import { useCustomForm } from "../../../hooks/useCustomForm";
import { createCustomTextInputArea } from "../../forms/customForm/TextAreaInput";
import { CustomForm } from "../../forms/customForm/CustomForm";
import { Button } from "react-bootstrap";
import { actions, useAppDispatch } from "../../../store";
import { Step } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";

const schema = yup.object({
  description: yup.string(),
});

export type AdditionalFormData = yup.InferType<typeof schema>;

const AdditionalTextArea = createCustomTextInputArea<AdditionalFormData>();

export const Additional = () => {
  const dispatch = useAppDispatch();
  const customForm = useCustomForm<AdditionalFormData>({
    schema,
    onSubmit: (data) => {
      dispatch(actions.createPropertyForm.setAdditional(data));
      dispatch(actions.createPropertyForm.setStep(Step.Confirmation));
    },
  });
  return (
    <>
      <CustomForm {...customForm}>
        <Contacts />
        <AdditionalTextArea name="description" placeholder="Descripcion" />
        <Button type={"submit"}>Siguiente</Button>
      </CustomForm>
    </>
  );
};
