import { Button, Col, Form } from "react-bootstrap";
import * as yup from "yup";
import { createCustomTextInput } from "../../forms/TextInput";
import { useCustomForm } from "../../../hooks/useCustomForm";
import { CustomForm } from "../../forms/CustomForm";
import { actions, useAppDispatch } from "../../../store";

const requiredMessage = "Este campo es requerido";

const schema = yup.object({
  totalSurface: yup.number().required(requiredMessage),
  coveredSurface: yup.number().required(requiredMessage),
  rooms: yup.number().positive().integer().required(requiredMessage),
  quarterBaths: yup.number().positive().integer().required(requiredMessage),
  halfBaths: yup.number().positive().integer().required(requiredMessage),
  threeQuarterBaths: yup
    .number()
    .positive()
    .integer()
    .required(requiredMessage),
  fullBaths: yup.number().positive().integer().required(requiredMessage),
  constructionYear: yup.number().required(requiredMessage),
  floors: yup.number().required(),
  parkDescription: yup.string(),
});

export type CharacteristicsFormData = yup.InferType<typeof schema>;

const CharacteristicsTextInput = createCustomTextInput<CharacteristicsFormData>();

export const Characteristics = () => {
  const dispatch = useAppDispatch();
  const customForm = useCustomForm<CharacteristicsFormData>({
    schema,
    onSubmit: (data) =>
      dispatch(actions.createPropertyForm.setCharacteristics(data)),
  });
  return (
    <CustomForm {...customForm}>
      <h3>Caracteristicas</h3>
      <Form.Row>
        <Col>
          <CharacteristicsTextInput
            name="totalSurface"
            placeholder="Superficie total"
          />
        </Col>
        <Col>
          <CharacteristicsTextInput
            name="coveredSurface"
            placeholder="Superficie cubierta"
          />
        </Col>
        <Col>
          <CharacteristicsTextInput
            name="constructionYear"
            placeholder="Fecha de construccion"
          />
        </Col>
      </Form.Row>

      <Form.Row>
        <Col>
          <CharacteristicsTextInput
            name="rooms"
            placeholder="Cantidad de habitaciones"
          />
        </Col>
        <Col>
          <CharacteristicsTextInput
            name="floors"
            placeholder="Cantidad de Pisos"
          />
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <CharacteristicsTextInput name="halfBaths" placeholder="half bath" />
        </Col>
        <Col>
          <CharacteristicsTextInput
            name="quarterBaths"
            placeholder="quarter bath"
          />
        </Col>

        <Col>
          <CharacteristicsTextInput
            name="threeQuarterBaths"
            placeholder="three quarter bath"
          />
        </Col>

        <Col>
          <CharacteristicsTextInput name="fullBaths" placeholder="full bath" />
        </Col>
      </Form.Row>
      <CharacteristicsTextInput
        name="parkDescription"
        placeholder="Descripcion del parque"
      />
      <Button type={"submit"}>Siguiente</Button>
    </CustomForm>
  );
};
