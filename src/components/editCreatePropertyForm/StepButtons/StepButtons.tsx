import styles from "./StepButtons.module.scss";
import { Button } from "react-bootstrap";
import { ReactNode, useEffect, useState } from "react";
import {
  selectCreatePropertyState,
  selectCurrentStep,
} from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import { urls } from "../../../constants";
import { useHistory } from "react-router-dom";
import { useCreatePropertyUsingPOST } from "../../../api";
import { toast } from "react-toastify";
import { createRequestData } from "../Confirmation/confirmationUtils";
import { Grid } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

interface StepButtonsProps {
  type?: "submit" | "button";
  onNext?: () => void;
  onPrevious?: () => void;
  canPartialSave?: () => Promise<boolean> | boolean;
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
  canPartialSave,
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

  const [partialSave, setPartialSave] = useState(false);

  useEffect(() => {
    const fun = async () => {
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
    if (partialSave) {
      fun();
      setPartialSave(false);
    }
  }, [createPropertyState, dispatch, history, mutateAsync, partialSave, step]);

  const handleSend = async () => {
    const canSave = canPartialSave?.();
    Promise.resolve(canSave).then(async function (value) {
      if (!value) {
        return;
      }
      setPartialSave(true);
    });
  };

  return (
    <div className={styles.stepButtonsContainer}>
      <Grid container className={styles.stepButtons}>
        <Grid xs className={styles.step_button_previous}>
          {showPrevious && (
            <CustomButton onClick={onPrevious}>
              <ArrowBackIcon />
              Anterior
            </CustomButton>
          )}
        </Grid>
        <Grid xs className={styles.step_button_save_changes}>
          {step !== 7 && (
            <CustomButton onClick={handleSend} disabled={disabledNext}>
              Guardar cambios
            </CustomButton>
          )}
        </Grid>
        <Grid xs className={styles.step_button_next}>
          {showNext && (
            <CustomButton onClick={onNext} type={type} disabled={disabledNext}>
              Siguiente <ArrowForwardIcon />
            </CustomButton>
          )}
        </Grid>
      </Grid>
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
