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
import { ConfirmationEditProperty } from "../../components/editCreatePropertyForm/Confirmation/ConfirmationEditProperty";
import styles from "./EditProperty.module.scss";
import clsx from "clsx";
import { Container } from "react-bootstrap";
import { getFeatureFlag } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/common/loading/Loading";
import { Suspense, useEffect } from "react";
import { selectIsInitialized } from "../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import { useGetPropertyUsingGET } from "../../api";
import { AddressRevamp } from "../../components/editCreatePropertyForm/Address/AddressRevamp";

export const EditProperty = () => {
  const currentStep = useAppSelector(selectCurrentStep);
  return (
    <>
      <Container fluid>
        <h1 className={styles.title}>Edita tu propiedad</h1>
        <StepBar currentStep={currentStep} />
        <Suspense fallback={<Loading />}>
          <CurrentStep currentStep={currentStep} />
        </Suspense>
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
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(selectIsInitialized);
  const { id } = useParams<{ id: string }>();
  const { data: property } = useGetPropertyUsingGET(id, {
    query: {
      suspense: true,
    },
  });

  useEffect(() => {
    if (property && !isInitialized) {
      dispatch(actions.editPropertyForm.setInitialValues(property));
    }
  }, [property]);

  if (!property) return <h4>Error</h4>;

  console.log(property);
  const address = property.address!;

  switch (currentStep) {
    case Step.BasicInfo:
      return (
        <BasicInfo
          price={property.price}
          expenses={property.expenses}
          type={property.type}
          title={property.title}
        />
      );
    case Step.Address:
      return (
        <AddressRevamp
          coordinates={address.coordinates}
          number={address.number}
          city={address.city}
          state={address.state}
          street={address.street}
          cityId={address.cityId}
          stateId={address.stateId}
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
      return <ConfirmationEditProperty id={id} />;
  }
  // }
};
