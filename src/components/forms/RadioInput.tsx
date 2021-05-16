import { Form } from "react-bootstrap";

export interface RadioInputListProps {
  items: string[];
  onSelected: (label: string) => void;
  name: string;
  defaultValue?: string;
}

export const RadioInput = ({
  items,
  name,
  onSelected,
  defaultValue = items[0],
}: RadioInputListProps) => {
  return (
    <>
      {items.map((label) => (
        <Form.Check
          key={label}
          id={`${name}-radio-${label}`}
          type={"radio"}
          label={label}
          value={label}
          name={name}
          onChange={() => onSelected(label)}
          // defaultValue={defaultValue}
          checked={label === defaultValue}
        />
      ))}
    </>
  );
};
