import { Form } from "react-bootstrap";
import { ChangeEventHandler, useState } from "react";

interface SelectProps {
  name: string;
  placeholder: string;
  options: SelectOption[];
  onSelect: (value: SelectOption["value"]) => void;
  defaultValue?: SelectOption["value"];
}

interface SelectOption {
  value: string;
  name: string;
}

export const SelectString = ({
  name,
  placeholder,
  options,
  onSelect,
  defaultValue = options[0]?.value,
}: SelectProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const val = e.target.value;
    setValue(val);
    onSelect(val);
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
        {options.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};
