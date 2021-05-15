import { ChangeEventHandler } from "react";
import { Form } from "react-bootstrap";

interface CheckOption {
  id: number;
  name: string;
}

interface CheckInputListProps {
  items: CheckOption[];
  onCheck: (id: CheckOption["id"]) => void;
  onUncheck: (id: CheckOption["id"]) => void;
  defaultValues?: CheckOption["id"][];
}

export const CheckInputList = ({
  items,
  onCheck,
  onUncheck,
  defaultValues = [],
}: CheckInputListProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked, value: id } = e.target;
    if (checked) onCheck(Number(id));
    else onUncheck(Number(id));
  };
  return (
    <>
      {items.map(({ id, name }) => (
        <Form.Check
          key={id}
          id={`${name}-check-${id}`}
          type={"checkbox"}
          label={name}
          value={id}
          onChange={handleChange}
          checked={defaultValues?.includes(id)}
        />
      ))}
    </>
  );
};
