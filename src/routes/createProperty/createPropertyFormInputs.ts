import { createCustomTextInput } from "../../components/forms/TextInput";
import { CreatePropertyFormData } from "./createPropertyFormData";
import { createCustomSelectInput } from "../../components/forms/SelectInput";

type CustomFormData = CreatePropertyFormData;

export const CreatePropertyTextInput = createCustomTextInput<CustomFormData>();

export const CreatePropertySelectInput = createCustomSelectInput<CustomFormData>();
