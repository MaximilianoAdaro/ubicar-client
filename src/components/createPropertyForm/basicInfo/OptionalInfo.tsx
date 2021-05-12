import { actions, useAppDispatch } from "../../../store";
import { CheckInputList } from "../../forms/CheckInputList";
import { Col, Form } from "react-bootstrap";

const amenities = [
  { id: 18, name: "Lavaplatos" },
  { id: 19, name: "Lavarropas" },
  { id: 20, name: "Secarropas" },
  { id: 21, name: "Aire Acondicionado" },
  { id: 22, name: "Calefaccion" },
];

const Amenities = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <h3>Disponibilidades</h3>
      <CheckInputList
        items={amenities}
        onCheck={(id) => dispatch(actions.createPropertyForm.addAmenity(id))}
        onUncheck={(id) =>
          dispatch(actions.createPropertyForm.removeAmenity(id))
        }
      />
    </>
  );
};

const securities = [
  { id: 23, name: "Rejas" },
  { id: 24, name: "Camaras" },
  { id: 25, name: "Alarmas" },
];

const Securities = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <h2>Medidas de seguridad</h2>
      <CheckInputList
        items={securities}
        onCheck={(id) => dispatch(actions.createPropertyForm.addSecurity(id))}
        onUncheck={(id) =>
          dispatch(actions.createPropertyForm.removeSecurity(id))
        }
      />
    </>
  );
};

const materials = [
  { id: 26, name: "Ladrillo" },
  { id: 27, name: "Cemento" },
  { id: 28, name: "Chapa" },
];

const Materials = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <h2>Materiales de construccion</h2>
      <CheckInputList
        items={materials}
        onCheck={(id) => dispatch(actions.createPropertyForm.addMaterial(id))}
        onUncheck={(id) =>
          dispatch(actions.createPropertyForm.removeMaterial(id))
        }
      />
    </>
  );
};

export const OptionalInfo = () => {
  return (
    <div>
      <Form.Row>
        <Col>
          <Form.Row>
            <Col>
              <Amenities />
            </Col>
          </Form.Row>
        </Col>
        <Col>
          <Form.Row>
            <Col>
              <Securities />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Materials />
            </Col>
          </Form.Row>
        </Col>
      </Form.Row>
    </div>
  );
};
