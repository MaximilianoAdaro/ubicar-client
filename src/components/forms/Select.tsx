import { Form } from "react-bootstrap";
import { ChangeEventHandler, useState } from "react";

interface SelectProps {
  name: string;
  placeholder: string;
  options: SelectOption[];
  onSelect: (id: SelectOption["id"]) => void;
}

interface SelectOption {
  id: number;
  displayName: string;
}

export const Select = ({
  name,
  placeholder,
  options,
  onSelect,
}: SelectProps) => {
  const [value, setValue] = useState(options?.[0]?.id);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const id = Number(e.target.value);
    setValue(id);
    onSelect(id);
  };
  return (
    <Form.Group>
      <Form.Label>{placeholder}</Form.Label>
      <Form.Control
        name={name}
        as="select"
        type="text"
        onChange={handleChange}
        value={value}
      >
        {options.map(({ displayName, id }) => (
          <option key={id} value={id}>
            {displayName}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};
