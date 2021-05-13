import styles from "./StepButtons.module.scss";
import { Button } from "react-bootstrap";
import { ReactNode } from "react";

interface StepButtonsProps {
  type?: "submit" | "button";
  onNext?: () => void;
  onPrevious?: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
}

export const StepButtons = ({
  type = "button",
  showPrevious = true,
  showNext = true,
  onNext,
  onPrevious,
}: StepButtonsProps) => {
  return (
    <div className={styles.stepButtonsContainer}>
      <div className={styles.stepButtons}>
        {showPrevious && (
          <CustomButton onClick={onPrevious}>Anterior</CustomButton>
        )}
        {showNext && (
          <CustomButton onClick={onNext} type={type}>
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
}

const CustomButton = ({
  children,
  onClick,
  type = "button",
}: CustomButtonProps) => {
  return (
    <Button
      // style={{ marginRight: 20 }}
      className={styles.customButton}
      variant={"outline-dark"}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
