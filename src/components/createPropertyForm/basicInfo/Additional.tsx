import { Contacts } from "./Contacts";
import * as yup from "yup";
import { useCustomForm } from "../../../hooks/useCustomForm";
import { createCustomTextInputArea } from "../../forms/TextAreaInput";
import { CustomForm } from "../../forms/CustomForm";

const schema = yup.object({
  description: yup.string(),
});

export type AdditionalFormData = yup.InferType<typeof schema>;

const AdditionalTextArea = createCustomTextInputArea<AdditionalFormData>();

export const Additional = () => {
  const customForm = useCustomForm<AdditionalFormData>({
    schema,
    onSubmit: (data) => console.log(data),
  });
  return (
    <>
      <CustomForm {...customForm}>
        <Contacts />
        <AdditionalTextArea name="description" placeholder="Descripcion" />
      </CustomForm>
    </>
  );
};
