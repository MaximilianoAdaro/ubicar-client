import { Col, Form, Jumbotron } from "react-bootstrap";
import { CreatePropertyTextInput } from "./createPropertyFormInputs";

export const Characteristics = () => (
  <Jumbotron>
    <h3>Caracteristicas</h3>
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
  </Jumbotron>
);
