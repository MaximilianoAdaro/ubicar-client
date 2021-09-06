import { CreatePropertyDTO } from "../../../api";
import { EditPropertyState } from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";

export const createRequestData = (
  data: EditPropertyState,
  step: number
): CreatePropertyDTO => ({
  id: data.id,
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
  step: step,
});
