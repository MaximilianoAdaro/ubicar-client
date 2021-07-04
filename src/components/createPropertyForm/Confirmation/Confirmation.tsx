import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { CreatePropertyDTO, useCreatePropertyUsingPOST } from "../../../api";
import { urls } from "../../../constants";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import {
  CreatePropertyState,
  selectCreatePropertyState,
  Step,
} from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import { StepButtons } from "../StepButtons/StepButtons";
import styles from "./Confirmation.module.scss";
import { toast } from "react-toastify";

const createRequestData = (data: CreatePropertyState): CreatePropertyDTO => ({
  title: data.basicInfo.title,
  price: data.basicInfo.price,
  expenses: data.basicInfo.expenses,
  condition: data.operationType,
  type: data.propertyType ?? "",
  address: {
    country: data.address.country,
    state: data.address.state,
    city: data.address.city,
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
});

export const Confirmation = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { mutateAsync } = useCreatePropertyUsingPOST({
    mutation: {
      onSuccess() {
        toast.success(" ✅ Created Property!", {
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
        toast.error(" ❌ Error on creating property!", {
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
    try {
      await mutateAsync({
        data: createRequestData(createPropertyState),
      });
      dispatch(actions.createPropertyForm.reset());
      history.push(urls.home);
    } catch (e) {
      throw Error;
    }
  };

  const handlePreviousButton = () => {
    dispatch(actions.createPropertyForm.setStep(Step.Additional));
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
