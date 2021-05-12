import { Button } from "react-bootstrap";
import { useAppSelector } from "../../store";
import { selectCreatePropertyState } from "../../store/slices/createPropetyForm/createPropertyFormSlice";

export const Confirmation = () => {
  const createPropertyState = useAppSelector(selectCreatePropertyState);
  return (
    <Button onClick={() => console.log(createPropertyState)}>Aceptar</Button>
  );
};
