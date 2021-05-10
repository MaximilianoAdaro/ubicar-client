import { Jumbotron } from "react-bootstrap";
import { CreatePropertyTextInput } from "./createPropertyFormInputs";

export const ExtraDescriptions = () => (
  <Jumbotron>
    <h4>Agrega mas descripciones de lugar</h4>
    <CreatePropertyTextInput
      name="parkDescription"
      placeholder="Caracteristicas del parque"
    />

    <CreatePropertyTextInput
      name="comments"
      placeholder="Comentarios Adicionales"
    />
  </Jumbotron>
);
