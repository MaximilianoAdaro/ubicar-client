import { useHistory } from "react-router-dom";
import { CreatePropertyDTO, useCreatePropertyUsingPOST } from "../../../api";
import { urls } from "../../../constants";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import {
  EditPropertyState,
  selectCreatePropertyState,
  selectCurrentStep,
  Step,
} from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import { toast } from "react-toastify";
import { ConfirmationHTML } from "./ConfirmationHTML";
import { use } from "msw/lib/types/utils/internal/requestHandlerUtils";

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

type Id = {
  id: string;
};

export const ConfirmationCreateProperty = ({ id }: Id) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  if (id == "Create") {
  }
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
  const step = useAppSelector(selectCurrentStep).valueOf();

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
  return (
    <ConfirmationHTML
      handleSend={handleSend}
      handlePrevious={handlePreviousButton}
    />
  );
};
