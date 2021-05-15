import { Container } from "react-bootstrap";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import {
  CreatePropertyState,
  selectCreatePropertyState,
  Step,
} from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import { StepButtons } from "../StepButtons/StepButtons";
import { useMutation } from "react-query";
import axios from "axios";
import styles from "./Confirmation.module.scss";

type ID = number;
type Time = string;

interface CreatePropertyRequestData {
  amenities: ID[];
  openHouses: { day: Date; initialTime: Time; finalTime: Time }[];
  rooms: number;
  address: {
    town: ID;
    street: string;
    postalCode: string;
    department: string;
    number: string;
  };
  comments: string;
  constructionYear: number;
  coveredSurface: number;
  title: string;
  type: ID;
  securities: ID[];
  youtubeLinks: string[];
  toilets: number;
  condition: string;
  parkDescription: string;
  materials: ID[];
  price: number;
  totalSurface: number;
  style: ID;
  fullBaths: number;
  levels: number;
  contacts: { label: string; email: string }[];
  expenses: number;
}

const createRequestData = (
  data: CreatePropertyState
): CreatePropertyRequestData => ({
  title: data.basicInfo.title,
  price: data.basicInfo.price,
  expenses: data.basicInfo.expenses,
  condition: data.operationType,
  type: data.propertyType!,
  address: {
    town: data.addressDropdowns.town,
    department: data.address.department,
    number: data.address.number,
    postalCode: data.address.postalCode,
    street: data.address.street,
  },
  coveredSurface: data.characteristics.coveredSurface,
  totalSurface: data.characteristics.totalSurface,
  levels: data.characteristics.floors,
  constructionYear: data.characteristics.constructionYear,
  style: data.style,
  rooms: data.characteristics.rooms,
  fullBaths: data.characteristics.fullBaths,
  toilets: data.characteristics.toilets,
  amenities: data.amenities,
  materials: data.materials,
  securities: data.securities,
  parkDescription: data.characteristics.parkDescription ?? "",
  youtubeLinks: data.youtubeLinks,
  contacts: data.contacts,
  openHouses: data.openHouses,
  comments: data.additional.description ?? "",
});

const useCreateProperty = () => {
  return useMutation<any, Error, CreatePropertyRequestData>((data) =>
    axios.post<CreatePropertyRequestData, any>(
      "http://localhost:8080/create",
      data
    )
  );
};

export const Confirmation = () => {
  const dispatch = useAppDispatch();
  const { mutate, error } = useCreateProperty();
  const createPropertyState = useAppSelector(selectCreatePropertyState);
  console.log({ error });

  const handleSend = () => {
    mutate(createRequestData(createPropertyState));
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
