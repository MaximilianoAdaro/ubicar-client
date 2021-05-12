import { BasicInfo } from "../../components/createPropertyForm/basicInfo/BasicInfo";
import { Address } from "../../components/createPropertyForm/address/Address";
import { Characteristics } from "../../components/createPropertyForm/basicInfo/Characteristics";
import { actions, useAppDispatch, useAppSelector } from "../../store";
import {
  selectCurrentStep,
  Step,
} from "../../store/slices/createPropetyForm/createPropertyFormSlice";
import { Container, Nav } from "react-bootstrap";
import { OptionalInfo } from "../../components/createPropertyForm/basicInfo/OptionalInfo";
import { Multimedia } from "../../components/createPropertyForm/basicInfo/Multimedia";
import { Additional } from "../../components/createPropertyForm/basicInfo/Additional";
import { Confirmation } from "../../components/createPropertyForm/Confirmation";

export const CreateProperty = () => {
  const currentStep = useAppSelector(selectCurrentStep);
  return (
    <>
      <Container>
        <h1>Publica tu propiedad</h1>
        <StepBar currentStep={currentStep} />
        <CurrentStep currentStep={currentStep} />
      </Container>
    </>
  );
};

const steps = [
  {
    step: Step.BasicInfo,
    displayName: "Informacion Basica",
  },
  {
    step: Step.Address,
    displayName: "Ubicacion",
  },
  {
    step: Step.Characteristics,
    displayName: "Caracteristicas",
  },
  {
    step: Step.OptionalInfo,
    displayName: "Informacion Opcional",
  },
  {
    step: Step.Multimedia,
    displayName: "Multimedia",
  },
  {
    step: Step.Additional,
    displayName: "Adicional",
  },
  {
    step: Step.Confirmation,
    displayName: "Confirmacion",
  },
];

interface StepBarProps {
  currentStep: Step;
}

const StepBar = ({ currentStep }: StepBarProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Nav
        activeKey={currentStep}
        onSelect={(selectedStep) =>
          dispatch(
            actions.createPropertyForm.setStep(Number(selectedStep) as Step)
          )
        }
      >
        {steps.map(({ displayName, step }) => (
          <Nav.Item>
            <Nav.Link eventKey={step}>{displayName}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </>
  );
};

interface CurrentStepProps {
  currentStep: Step;
}

const CurrentStep = ({ currentStep }: CurrentStepProps) => {
  switch (currentStep) {
    case Step.BasicInfo:
      return <BasicInfo />;
    case Step.Address:
      return <Address />;
    case Step.Characteristics:
      return <Characteristics />;
    case Step.OptionalInfo:
      return <OptionalInfo />;
    case Step.Multimedia:
      return <Multimedia />;
    case Step.Additional:
      return <Additional />;
    case Step.Confirmation:
      return <Confirmation />;
  }
};
