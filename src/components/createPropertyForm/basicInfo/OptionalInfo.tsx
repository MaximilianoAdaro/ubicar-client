import { ChangeEventHandler } from "react";
import { Form } from "react-bootstrap";
import { actions, useAppDispatch } from "../../../store";

interface CheckOption {
  id: number;
  name: string;
}

interface CheckInputProps {
  checks: CheckOption[];
  onCheck: (id: CheckOption["id"]) => void;
  onUnCheck: (id: CheckOption["id"]) => void;
}

const CheckInput = ({ checks, onCheck, onUnCheck }: CheckInputProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked, value: id } = e.target;
    if (checked) onCheck(Number(id));
    else onUnCheck(Number(id));
  };
  return (
    <>
      {checks.map(({ id, name }) => (
        <Form.Check
          key={id}
          type={"checkbox"}
          label={name}
          value={id}
          onChange={handleChange}
        />
      ))}
    </>
  );
};

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
      <CheckInput
        checks={amenities}
        onCheck={(id) => dispatch(actions.createPropertyForm.addAmenity(id))}
        onUnCheck={(id) =>
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
      <CheckInput
        checks={securities}
        onCheck={(id) => dispatch(actions.createPropertyForm.addSecurity(id))}
        onUnCheck={(id) =>
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
      <CheckInput
        checks={materials}
        onCheck={(id) => dispatch(actions.createPropertyForm.addMaterial(id))}
        onUnCheck={(id) =>
          dispatch(actions.createPropertyForm.removeMaterial(id))
        }
      />
    </>
  );
};

export const OptionalInfo = () => {
  return (
    <div>
      <Amenities />
      <Securities />
      <Materials />
    </div>
  );
};
