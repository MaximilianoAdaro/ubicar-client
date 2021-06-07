import { Container } from "react-bootstrap";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import {
  CreatePropertyState,
  selectCreatePropertyState,
  Step,
} from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import { StepButtons } from "../StepButtons/StepButtons";
import styles from "./Confirmation.module.scss";

import { useHistory } from "react-router-dom";
import { useCreateProperty } from "../../../api/property";
import { urls } from "../../../constants";
import { CreatePropertyDTO } from "../../../generated/api";

const createRequestData = (data: CreatePropertyState): CreatePropertyDTO => ({
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
    day,
    initialTime: initialTime as any,
    finalTime: finalTime as any,
  })),
  comments: data.additional.description ?? "",
});

export const Confirmation = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { mutateAsync } = useCreateProperty();
  const createPropertyState = useAppSelector(selectCreatePropertyState);

  const handleSend = async () => {
    try {
      await mutateAsync(createRequestData(createPropertyState));
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
