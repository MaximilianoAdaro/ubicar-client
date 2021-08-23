import { useHistory } from "react-router-dom";
import { urls } from "../../../constants";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import {
  EditPropertyState,
  selectCreatePropertyState,
  Step,
} from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import { useQueryClient } from "react-query";
import {
  CreatePropertyDTO,
  getGetPropertyUsingGETQueryKey,
  useEditPropertyUsingPUT,
} from "../../../api";
import { toast } from "react-toastify";
import { ConfirmationHTML } from "./ConfirmationHTML";

const createRequestData = (data: EditPropertyState): CreatePropertyDTO => ({
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
    initialTime: initialTime as any,
    finalTime: finalTime as any,
  })),
  comments: data.additional.description ?? "",
});

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

  const handleSend = async () => {
    dispatch(actions.editPropertyForm.setStep(Step.BasicInfo));
    try {
      await mutateAsync({
        id,
        data: createRequestData(createPropertyState),
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
