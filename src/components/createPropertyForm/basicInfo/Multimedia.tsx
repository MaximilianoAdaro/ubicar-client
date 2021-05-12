import { VideoInput } from "./VideoInput";
import { Button } from "react-bootstrap";
import { actions, useAppDispatch } from "../../../store";
import { Step } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";

export const Multimedia = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(actions.createPropertyForm.setStep(Step.Additional));
  };

  return (
    <div>
      <VideoInput />
      <Button onClick={handleClick}>Siguiente</Button>
    </div>
  );
};
