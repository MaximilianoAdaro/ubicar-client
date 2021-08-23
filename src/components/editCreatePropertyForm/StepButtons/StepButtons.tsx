import styles from "./StepButtons.module.scss";
import { Button } from "react-bootstrap";
import { ReactNode } from "react";
import { selectCreatePropertyState } from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import { useAppSelector } from "../../../store";

interface StepButtonsProps {
  type?: "submit" | "button";
  onNext?: () => void;
  onPrevious?: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
  disabledNext?: boolean;
}

export const StepButtons = ({
  type = "button",
  showPrevious = true,
  showNext = true,
  disabledNext = false,
  onNext,
  onPrevious,
}: StepButtonsProps) => {
  const createPropertyState = useAppSelector(selectCreatePropertyState);

  function handleSend() {
    //aca deberia pegarle al endpoint con createPropertyState
    console.log(createPropertyState);
  }

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
