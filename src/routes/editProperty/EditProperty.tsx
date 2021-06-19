import { BasicInfo } from "../../components/editProperty/BasicInfo/BasicInfo";
import { Address } from "../../components/editProperty/Address/Address";
import { Characteristics } from "../../components/editProperty/Characteristics/Characteristics";
import { actions, useAppDispatch, useAppSelector } from "../../store";
import {
  selectCurrentStep,
  Step,
} from "../../store/slices/createPropetyForm/createPropertyFormSlice";
import { OptionalInfo } from "../../components/editProperty/OptionalInfo/OptionalInfo";
import { Multimedia } from "../../components/editProperty/Multimedia/Multimedia";
import { Additional } from "../../components/editProperty/Additional/Additional";
import { Confirmation } from "../../components/editProperty/Confirmation/Confirmation";
import styles from "./EditProperty.module.scss";
import clsx from "clsx";
import { Container } from "react-bootstrap";
import { getFeatureFlag } from "../../utils/utils";
import { NavBar } from "../../components/navbar/NavBar";
import { useParams } from "react-router-dom";
import { useFetchProperties, useGetProperty } from "../../api/property";
import { useState } from "react";
// import {useFetchProperties} from "../../api/property";

export const EditProperty = () => {
  const currentStep = useAppSelector(selectCurrentStep);
  return (
    <>
      <Container fluid>
        <NavBar />
        <h1 className={styles.title}>Edita tu propiedad</h1>
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
                dispatch(actions.createPropertyForm.setStep(step));
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
  // }
};
