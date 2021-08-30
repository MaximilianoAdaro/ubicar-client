import { useHistory } from "react-router-dom";
import { CreatePropertyDTO, useCreatePropertyUsingPOST } from "../../../api";
import { urls } from "../../../constants";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import {
  selectCreatePropertyState,
  selectCurrentStep,
  selectImages,
  Step,
} from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import { toast } from "react-toastify";
import { ConfirmationHTML } from "./ConfirmationHTML";
import { createRequestData } from "./confirmationUtils";
import { useGetPropertyDto } from "../../../api/custom/property";

type Id = {
  id: string;
};

export const ConfirmationCreateProperty = ({ id }: Id) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { mutateAsync } = useCreatePropertyUsingPOST({
    mutation: {
      onSuccess() {
        toast.success(" ✅ Propiedad Creada!", {
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
        toast.error(" ❌ Error en la creacion de la propriedad!", {
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
  const images = useAppSelector(selectImages);
  const formData = new FormData();
  for (var i = 0; i < images.length; i++) {
    formData.append("image", images[i]);
  }

  const step = useAppSelector(selectCurrentStep).valueOf();

  const { data: property, isLoading: propertyLoading } = useGetPropertyDto(
    createRequestData(createPropertyState, step)
  );

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

  const handlePreviousButton = () => {
    dispatch(actions.editPropertyForm.setStep(Step.Additional));
  };

  // if (propertyLoading) return <Loadi

  // if (!property) return null;

  return (
    <ConfirmationHTML
      handleSend={handleSend}
      handlePrevious={handlePreviousButton}
      property={property}
    />
  );
};
