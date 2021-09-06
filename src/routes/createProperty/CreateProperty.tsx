import { BasicInfo } from "../../components/editCreatePropertyForm/BasicInfo/BasicInfo";
import { Characteristics } from "../../components/editCreatePropertyForm/Characteristics/Characteristics";
import { actions, useAppDispatch, useAppSelector } from "../../store";
import {
  selectCurrentStep,
  Step,
} from "../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import { OptionalInfo } from "../../components/editCreatePropertyForm/OptionalInfo/OptionalInfo";
import { Multimedia } from "../../components/editCreatePropertyForm/Multimedia/Multimedia";
import { Additional } from "../../components/editCreatePropertyForm/Additional/Additional";
import { ConfirmationCreateProperty } from "../../components/editCreatePropertyForm/Confirmation/ConfirmationCreateProperty";
import styles from "./CreateProperty.module.scss";
import clsx from "clsx";
import { Container } from "react-bootstrap";
import { getFeatureFlag } from "../../utils/utils";
import { AddressRevamp } from "../../components/editCreatePropertyForm/Address/AddressRevamp";

export const CreateProperty = () => {
  const currentStep = useAppSelector(selectCurrentStep);
  return (
    <>
      <Container
        fluid
        style={{
          marginBottom: 50,
        }}
      >
        <h1 className={styles.mainTitle}>Publica tu propiedad</h1>
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
  const enableSuperUser = getFeatureFlag("enableSuperUser");
  return (
    <>
      <div className={styles.stepBarContainer}>
        {steps.map(({ displayName, step }) => (
          <div
            key={step}
            className={clsx(styles.stepBarItem, {
              [styles.cursorPointer]: enableSuperUser,
            })}
            onClick={() => {
              if (enableSuperUser)
                dispatch(actions.editPropertyForm.setStep(step));
            }}
          >
            <span>{displayName}</span>
            <div
              className={clsx(styles.highlighter, {
                [styles.active]: step === currentStep,
              })}
            />
          </div>
        ))}
      </div>
    </>
  );
};

interface CurrentStepProps {
  currentStep: Step;
}

const CurrentStep = ({ currentStep }: CurrentStepProps) => {
  switch (currentStep) {
    case Step.BasicInfo:
      return (
        <BasicInfo
          price={undefined}
          expenses={undefined}
          type={undefined}
          title={undefined}
        />
      );
    case Step.Address:
      return (
        <AddressRevamp
          coordinates={{ lat: -4114291.375798843, long: -6506056.858887733 }}
          number={0}
          city={""}
          state={""}
          street={""}
          cityId={""}
          stateId={""}
        />
      );
    case Step.Characteristics:
      return <Characteristics />;
    case Step.OptionalInfo:
      return <OptionalInfo />;
    case Step.Multimedia:
      return <Multimedia />;
    case Step.Additional:
      return <Additional />;
    case Step.Confirmation:
      return <ConfirmationCreateProperty id={"Create"} />;
  }
};
