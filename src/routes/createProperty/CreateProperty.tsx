import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { TextInput } from "../../components/input/TextInput";
import { CreatePropertyFormData, schema } from "./createPropertyFormData";
import { SelectInput } from "../../components/input/SelectInput";
import { yupResolver } from "@hookform/resolvers/yup";

export const CreateProperty = () => {
  const { handleSubmit, control } = useForm<CreatePropertyFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Container>
      <h1>Publicar una propiedad</h1>

      <Form onSubmit={onSubmit} noValidate>
        <Form.Row>
          <Col>
            <TextInput control={control} name="title" placeholder="Titulo" />
          </Col>
          <Col>
            <TextInput control={control} name="style" placeholder="Estilo" />
          </Col>
          <Col>
            <SelectInput
              control={control}
              name="condition"
              placeholder="Condicion"
              options={[
                { value: "sale", displayName: "Venta" },
                { value: "rental", displayName: "Alquiler" },
              ]}
            />
          </Col>
        </Form.Row>

        <TextInput control={control} name="address" placeholder="Direccion" />

        <Form.Row>
          <Col>
            <TextInput
              control={control}
              name="squareFoot"
              placeholder="Metros cuadrados"
            />
          </Col>
          <Col>
            <TextInput
              control={control}
              name="constructionDate"
              placeholder="Fecha de construccion"
              type="date"
            />
          </Col>
        </Form.Row>

        <TextInput
          control={control}
          name="rooms"
          placeholder="Cantidad de habitaciones"
        />

        <Form.Row>
          <Col>
            <TextInput
              control={control}
              name="halfBaths"
              placeholder="half bath"
            />
          </Col>
          <Col>
            <TextInput
              control={control}
              name="quarterBaths"
              placeholder="quarter bath"
            />
          </Col>

          <Col>
            <TextInput
              control={control}
              name="threeQuarterBaths"
              placeholder="three quarter bath"
            />
          </Col>

          <Col>
            <TextInput
              control={control}
              name="fullBaths"
              placeholder="full bath"
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <TextInput control={control} name="price" placeholder="Precio" />
          </Col>
          <Col>
            <TextInput
              control={control}
              name="expenses"
              placeholder="Precio de expensas"
            />
          </Col>
        </Form.Row>

        <TextInput
          control={control}
          name="availabilitiesIncluded"
          placeholder="Disponibilidades incluidas"
        />
        <TextInput
          control={control}
          name="constructionMaterial"
          placeholder="Material de construccion"
        />
        <TextInput
          control={control}
          name="securityMeasures"
          placeholder="Medidas de seguridad"
        />
        <TextInput
          control={control}
          name="parkCharacteristics"
          placeholder="Caracteristicas del parque"
        />
        <TextInput
          control={control}
          name="youtubeLink"
          placeholder="Link de Youtube"
        />
        <TextInput
          control={control}
          name="sellerContact"
          placeholder="Contacto de vendedor"
        />

        <TextInput
          control={control}
          name="openHouseDays"
          placeholder="Dias y Horarios para una Open ListingHouse"
        />

        <TextInput
          control={control}
          name="additionalComments"
          placeholder="Comentarios Adicionales"
        />

        <Button type="submit">Submit form</Button>
      </Form>
    </Container>
  );
};

// additionalComments?: string;
