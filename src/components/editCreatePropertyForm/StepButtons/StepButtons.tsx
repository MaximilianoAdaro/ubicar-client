import styles from "./StepButtons.module.scss";
import { Button } from "react-bootstrap";
import { ReactNode } from "react";
import {
  EditPropertyState,
  selectCreatePropertyState,
  selectCurrentStep,
} from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import { urls } from "../../../constants";
import { useHistory } from "react-router-dom";
import { CreatePropertyDTO, useCreatePropertyUsingPOST } from "../../../api";
import { toast } from "react-toastify";

interface StepButtonsProps {
  type?: "submit" | "button";
  onNext?: () => void;
  onPrevious?: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
  disabledNext?: boolean;
}

const createRequestData = (
  data: EditPropertyState,
  step: number
): CreatePropertyDTO => ({
  title: data.basicInfo.title,
  price: data.basicInfo.price,
  expenses: data.basicInfo.expenses,
  condition: data.operationType,
  type: data.propertyType ?? "",
  address: {
    stateId: data.address.stateId,
    cityId: data.address.cityId,
    street: data.address.street,
    number: data.address.number,
    coordinates: data.address.coordinates,
  },
  environments: data.characteristics.environments,
  coveredSquareFoot: data.characteristics.coveredSurface,
  squareFoot: data.characteristics.totalSurface,
  levels: data.characteristics.floors,
  constructionDate: data.characteristics.constructionYear,
  style: data.style ?? "",
  rooms: data.characteristics.rooms,
  fullBaths: data.characteristics.fullBaths,
  toilets: data.characteristics.toilets,
  amenities: data.amenities,
  materials: data.materials,
  security: data.securities,
  parkDescription: data.characteristics.parkDescription ?? "",
  links: data.youtubeLinks,
  contacts: data.contacts,
  openHouse: data.openHouses.map(({ day, initialTime, finalTime }) => ({
    day: new Date(day).toISOString(),
    initialTime,
    finalTime,
  })),
  comments: data.additional.description ?? "",
  step: step,
});

export const StepButtons = ({
  type = "button",
  showPrevious = true,
  showNext = true,
  disabledNext = false,
  onNext,
  onPrevious,
}: StepButtonsProps) => {
  const createPropertyState = useAppSelector(selectCreatePropertyState);
  const step = useAppSelector(selectCurrentStep).valueOf();

  const history = useHistory();
  const dispatch = useAppDispatch();

  const { mutateAsync } = useCreatePropertyUsingPOST({
    mutation: {
      onSuccess() {
        toast.success(" ✅ Propiedad Guardada!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      },
      onError() {
        toast.error(" ❌ Error en el guardado de la propriedad!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      },
    },
  });

  const handleSend = async () => {
    try {
      await mutateAsync({
        data: createRequestData(createPropertyState, step),
      });
      dispatch(actions.editPropertyForm.reset());
      history.push(urls.home);
    } catch (e) {
      throw Error;
    }
  };

  return (
    <div className={styles.stepButtonsContainer}>
      <div className={styles.stepButtons}>
        <CustomButton onClick={handleSend}>Guardar cambios</CustomButton>
        {showPrevious && (
          <CustomButton onClick={onPrevious}>Anterior</CustomButton>
        )}
        {showNext && (
          <CustomButton onClick={onNext} type={type} disabled={disabledNext}>
            Siguiente
          </CustomButton>
        )}
      </div>
    </div>
  );
};

interface CustomButtonProps {
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
  children: ReactNode;
  disabled?: boolean;
}

const CustomButton = ({
  children,
  onClick,
  disabled,
  type = "button",
}: CustomButtonProps) => {
  return (
    <Button
      // style={{ marginRight: 20 }}
      className={styles.customButton}
      variant={"outline-dark"}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
