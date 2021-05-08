import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { TextInput } from "./TextInput";
import { FormData, schema } from "./formData";
import { SelectInput } from "./SelectInput";
import { yupResolver } from "@hookform/resolvers/yup";

export const CreateProperty = () => {
  const { handleSubmit, control } = useForm<FormData>({
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
                { value: "sale", name: "Venta" },
                { value: "rental", name: "Alquiler" },
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

        <Button type="submit">Submit form</Button>
      </Form>
    </Container>
  );
};
