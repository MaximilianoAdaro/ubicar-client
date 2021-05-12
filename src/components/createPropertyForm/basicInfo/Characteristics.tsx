import { Button, Col, Form } from "react-bootstrap";
import * as yup from "yup";
import { createCustomTextInput } from "../../forms/customForm/TextInput";
import { useCustomForm } from "../../../hooks/useCustomForm";
import { CustomForm } from "../../forms/customForm/CustomForm";
import { actions, useAppDispatch } from "../../../store";
import { createCustomTextInputArea } from "../../forms/customForm/TextAreaInput";
import { Step } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import { Select } from "../../forms/Select";

const requiredMessage = "Este campo es requerido";

const schema = yup.object({
  totalSurface: yup.number().required(requiredMessage),
  coveredSurface: yup.number().required(requiredMessage),
  rooms: yup.number().positive().integer().required(requiredMessage),
  ambiences: yup.number().positive().integer().required(requiredMessage),
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
const CharacteristicsTextArea = createCustomTextInputArea<CharacteristicsFormData>();

export const Characteristics = () => {
  const dispatch = useAppDispatch();
  const customForm = useCustomForm<CharacteristicsFormData>({
    schema,
    onSubmit: (data) => {
      dispatch(actions.createPropertyForm.setCharacteristics(data));
      dispatch(actions.createPropertyForm.setStep(Step.OptionalInfo));
    },
  });
  return (
    <CustomForm {...customForm}>
      <Form.Row>
        <Col>
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
                placeholder="Superficie cubiertaf"
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <CharacteristicsTextInput
                name="ambiences"
                placeholder="Cantidad de ambientes"
              />
            </Col>
            <Col>
              <CharacteristicsTextInput
                name="rooms"
                placeholder="Cantidad de habitaciones"
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <CharacteristicsTextInput
                name="fullBaths"
                placeholder="Baños completos"
              />
            </Col>
            <Col>
              <CharacteristicsTextInput
                name="threeQuarterBaths"
                placeholder="3/4 Baños"
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <CharacteristicsTextInput
                name="halfBaths"
                placeholder="1/2 Baños"
              />
            </Col>
            <Col>
              <CharacteristicsTextInput
                name="quarterBaths"
                placeholder="1/4 Baños"
              />
            </Col>
          </Form.Row>
        </Col>

        <Col>
          <Form.Row>
            <Col>
              <CharacteristicsTextInput
                name="floors"
                placeholder="Cantidad de Pisos"
              />
            </Col>

            <Col>
              <CharacteristicsTextInput
                name="constructionYear"
                placeholder="Año de construccion"
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Select
                name={"style"}
                placeholder={"Estilo"}
                options={styles}
                onSelect={(id) =>
                  dispatch(actions.createPropertyForm.setStyle(id))
                }
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <CharacteristicsTextArea
                name="parkDescription"
                placeholder={"Caracteristicas del parque"}
              />
            </Col>
          </Form.Row>
        </Col>
      </Form.Row>
      <Button type={"submit"}>Siguiente</Button>
    </CustomForm>
  );
};

const styles = [
  "Colonial",
  "askdf",
  "adsgasgaf",
  "sagasfko",
  "aksdjnf",
].map((displayName, id) => ({ displayName, id }));
