import { Form } from "react-bootstrap";
import { ChangeEventHandler, useState } from "react";

interface SelectProps {
  name: string;
  placeholder: string;
  options: SelectOption[];
  onSelect: (id: SelectOption["id"]) => void;
  defaultValue?: SelectOption["id"];
}

interface SelectOption {
  id: string;
  name: string;
}

export const Select = ({
  name,
  placeholder,
  options,
  onSelect,
  defaultValue = options[0]?.id,
}: SelectProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const id = e.target.value;
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
        {options.map(({ name, id }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};
