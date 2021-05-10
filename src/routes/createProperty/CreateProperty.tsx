import { Button, Container } from "react-bootstrap";
import { CreatePropertyFormData, schema } from "./createPropertyFormData";
import { useCustomForm } from "../../hooks/useCustomForm";
import { CustomForm } from "../../components/forms/CustomForm";
import { Description } from "./Description";
import { Address } from "./Address";
import { Price } from "./Price";
import { Characteristics } from "./Characteristics";
import { VideoInput } from "./VideoInput";
import { useAppSelector } from "../../store";
import { Amenities } from "./Amenities";
import { Materials } from "./Materials";
import { Contacts } from "./Contacts";
import { Securities } from "./Securities";
import { ExtraDescriptions } from "./ExtraDescriptions";

export const CreateProperty = () => {
  const createPropertyState = useAppSelector(
    (state) => state.createPropertyForm
  );
  const customFormProps = useCustomForm<CreatePropertyFormData>({
    schema,
    onSubmit: (data) => console.log({ ...data, ...createPropertyState }),
  });
  return (
    <Container>
      <h1>Publicar una propiedad</h1>

      <CustomForm {...customFormProps}>
        <Description />
        <Address />
        <Characteristics />
        <Price />
        <Amenities />
        <Materials />
        <Securities />
        <ExtraDescriptions />
        <VideoInput />
        <Contacts />
        <Button type="submit">Submit form</Button>
      </CustomForm>
    </Container>
  );
};
