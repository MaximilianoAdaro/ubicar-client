import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { urls } from "../../../constants";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import {
  EditPropertyState,
  selectCreatePropertyState,
  Step,
} from "../../../store/slices/editPropertyForm/editPropertyFormSlice";
import { StepButtons } from "../StepButtons/StepButtons";
import styles from "./Confirmation.module.scss";
import { useQueryClient } from "react-query";
import {
  CreatePropertyDTO,
  getGetPropertyUsingGETQueryKey,
  useEditPropertyUsingPUT,
} from "../../../api";

const createRequestData = (data: EditPropertyState): CreatePropertyDTO => ({
  title: data.basicInfo.title,
  price: data.basicInfo.price,
  expenses: data.basicInfo.expenses,
  condition: data.operationType,
  type: data.propertyType ?? "",
  address: {
    town_id: data.addressDropdowns.town ?? "",
    department: data.address.department,
    number: data.address.number,
    postalCode: data.address.postalCode,
    street: data.address.street,
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
export const Confirmation = ({ id }: Id) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const queryClient = useQueryClient();
  const { mutateAsync } = useEditPropertyUsingPUT({
    mutation: {
      onSuccess() {
        queryClient.invalidateQueries(getGetPropertyUsingGETQueryKey(id));
      },
    },
  });
  const createPropertyState = useAppSelector(selectCreatePropertyState);

  const handleSend = async () => {
    try {
      await mutateAsync({
        id,
        data: createRequestData(createPropertyState),
      });
      history.push(urls.home);
    } catch (e) {
      throw Error;
    }
  };

  const handlePreviousButton = () => {
    dispatch(actions.editPropertyForm.setStep(Step.Additional));
  };

  return (
    <Container>
      <Preview />
      <div className={styles.buttons}>
        <StepButtons onNext={handleSend} onPrevious={handlePreviousButton} />
      </div>
    </Container>
  );
};

export const Preview = () => {
  return (
    <div>
      <div className={styles.container}>
        <h4>Preview</h4>
        <div className={styles.comingSoon}>
          <h3>Proximamente...</h3>
        </div>
      </div>
    </div>
  );
};
