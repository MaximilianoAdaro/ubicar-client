import { Button, Container } from "react-bootstrap";
import { CreatePropertyFormData, schema } from "./createPropertyFormData";
import { useCustomForm } from "../../hooks/useCustomForm";
import { CustomForm } from "../../components/forms/CustomForm";
import { CreatePropertyTextInput } from "./createPropertyFormInputs";
import { Description } from "./Description";
import { Address } from "./Address";
import { Price } from "./Price";
import { Characteristics } from "./Characteristics";

export const CreateProperty = () => {
  const customFormProps = useCustomForm<CreatePropertyFormData>({
    schema,
    onSubmit: (data) => console.log(data),
  });
  return (
    <Container>
      <h1>Publicar una propiedad</h1>

      <CustomForm {...customFormProps}>
        <Description />
        <Address />

        <Characteristics />

        <Price />

        <CreatePropertyTextInput
          name="availabilitiesIncluded"
          placeholder="Disponibilidades incluidas"
        />
        <CreatePropertyTextInput
          name="constructionMaterial"
          placeholder="Material de construccion"
        />
        <CreatePropertyTextInput
          name="securityMeasures"
          placeholder="Medidas de seguridad"
        />
        <CreatePropertyTextInput
          name="parkCharacteristics"
          placeholder="Caracteristicas del parque"
        />
        <CreatePropertyTextInput
          name="youtubeLink"
          placeholder="Link de Youtube"
        />
        <CreatePropertyTextInput
          name="sellerContact"
          placeholder="Contacto de vendedor"
        />

        <CreatePropertyTextInput
          name="openHouseDays"
          placeholder="Dias y Horarios para una Open House"
        />

        <CreatePropertyTextInput
          name="additionalComments"
          placeholder="Comentarios Adicionales"
        />

        <Button type="submit">Submit form</Button>
      </CustomForm>
    </Container>
  );
};
