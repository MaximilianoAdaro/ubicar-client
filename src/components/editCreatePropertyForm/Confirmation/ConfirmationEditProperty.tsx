import { useHistory } from "react-router-dom";
import { urls } from "../../../constants";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import {
  EditPropertyState,
  selectCreatePropertyState,
  selectCurrentStep,
  Step,
} from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import { useQueryClient } from "react-query";
import {
  getGetPropertyUsingGETQueryKey,
  useEditPropertyUsingPUT,
  useGetPropertyDto,
} from "../../../api";
import { toast } from "react-toastify";
import { ConfirmationHTML } from "./ConfirmationHTML";
import { createRequestData } from "./confirmationUtils";

type Id = {
  id: string;
};

export const ConfirmationEditProperty = ({ id }: Id) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const queryClient = useQueryClient();
  const { mutateAsync } = useEditPropertyUsingPUT({
    mutation: {
      onSuccess() {
        toast.success(" ✅ Propiedad editada!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        queryClient.invalidateQueries(getGetPropertyUsingGETQueryKey(id));
      },
      onError() {
        toast.error(" ❌ Error en la edición de la Propiedad!", {
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
  const createPropertyState = useAppSelector(selectCreatePropertyState);
  const step = useAppSelector(selectCurrentStep).valueOf();

  const { data: property, isLoading: propertyLoading } = useGetPropertyDto(
    createRequestData(createPropertyState, step)
  );

  const handleSend = async () => {
    dispatch(actions.editPropertyForm.setStep(Step.BasicInfo));
    try {
      await mutateAsync({
        id,
        data: createRequestData(createPropertyState, step),
      });
      dispatch(actions.editPropertyForm.reset());
      history.push(urls.home);
    } catch (e) {
      throw Error;
    }
    dispatch(actions.editPropertyForm.reset());
  };

  const handlePreviousButton = () => {
    dispatch(actions.editPropertyForm.setStep(Step.Additional));
  };

  return (
    <ConfirmationHTML
      handleSend={handleSend}
      handlePrevious={handlePreviousButton}
      property={property}
    />
  );
};
