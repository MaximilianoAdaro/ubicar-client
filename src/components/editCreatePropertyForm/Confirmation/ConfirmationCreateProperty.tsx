import { useHistory } from "react-router-dom";
import { useCreatePropertyUsingPOST } from "../../../api";
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
import { useGetPropertyDto } from "../../../api";

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
  const step = useAppSelector(selectCurrentStep).valueOf();

  const { data: property, isLoading: propertyLoading } = useGetPropertyDto(
    createRequestData(createPropertyState, step)
  );

  const handleSend = async () => {
    try {
      const json = JSON.stringify(createRequestData(createPropertyState, step));
      const blob = new Blob([json], {
        type: "application/json",
      });
      const formData = new FormData();
      formData.append("property", blob);
      for (var i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      // formData.append("property",JSON.stringify(createRequestData(createPropertyState, step)))
      // await mutateAsync({
      //   data: createRequestData(createPropertyState, step),
      // });
      var requestOptions = {
        method: "POST",
        body: formData,
        // headers: {'Content-Type':'multipart/form-data'}
        // redirect: 'follow'
      };

      fetch("/property/create-with-images", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      dispatch(actions.editPropertyForm.reset());
      history.push(urls.home);
    } catch (e) {
      throw Error;
    }
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
