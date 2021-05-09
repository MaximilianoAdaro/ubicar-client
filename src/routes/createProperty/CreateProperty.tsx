import { Button, Col, Container, Form } from "react-bootstrap";
import { CreatePropertyFormData, schema } from "./createPropertyFormData";
import React from "react";
import { useCustomForm } from "../../hooks/useCustomForm";
import { CustomForm } from "../../components/forms/CustomForm";
import { CreatePropertyTextInput } from "./createPropertyFormInputs";
import { Description } from "./Description";

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
        <CreatePropertyTextInput name="address" placeholder="Direccion" />

        <Form.Row>
          <Col>
            <CreatePropertyTextInput
              name="squareFoot"
              placeholder="Metros cuadrados"
            />
          </Col>
          <Col>
            <CreatePropertyTextInput
              name="constructionDate"
              placeholder="Fecha de construccion"
              type="date"
            />
          </Col>
        </Form.Row>

        <CreatePropertyTextInput
          name="rooms"
          placeholder="Cantidad de habitaciones"
        />

        <Form.Row>
          <Col>
            <CreatePropertyTextInput name="halfBaths" placeholder="half bath" />
          </Col>
          <Col>
            <CreatePropertyTextInput
              name="quarterBaths"
              placeholder="quarter bath"
            />
          </Col>

          <Col>
            <CreatePropertyTextInput
              name="threeQuarterBaths"
              placeholder="three quarter bath"
            />
          </Col>

          <Col>
            <CreatePropertyTextInput name="fullBaths" placeholder="full bath" />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <CreatePropertyTextInput name="price" placeholder="Precio" />
          </Col>
          <Col>
            <CreatePropertyTextInput
              name="expenses"
              placeholder="Precio de expensas"
            />
          </Col>
        </Form.Row>

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
