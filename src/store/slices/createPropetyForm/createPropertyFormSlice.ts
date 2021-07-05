import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { BasicInfoFormData } from "../../../components/createPropertyForm/BasicInfo/BasicInfo";
import { CharacteristicsFormData } from "../../../components/createPropertyForm/Characteristics/Characteristics";
import { AdditionalFormData } from "../../../components/createPropertyForm/Additional/Additional";
import { isEqualObjects } from "../../../utils/utils";
import { AddressFormData } from "../../../components/createPropertyForm/Address/AddressRevamp";

// Define a type for the slice state
export interface CreatePropertyState {
  operationType: string;
  style: string | undefined;
  youtubeLinks: string[];
  amenities: string[];
  materials: string[];
  securities: string[];
  contacts: Contact[];
  openHouses: OpenHouse[];
  propertyType: string | undefined;
  addressDropdowns: {
    state: string | undefined;
    city: string | undefined;
    town: string | undefined;
  };
  address: AddressFormData;
  basicInfo: BasicInfoFormData;
  characteristics: CharacteristicsFormData;
  additional: AdditionalFormData;
  currentStep: Step;
}

export enum Step {
  BasicInfo,
  Address,
  Characteristics,
  OptionalInfo,
  Multimedia,
  Additional,
  Confirmation,
}

export interface OpenHouse {
  day: string;
  initialTime: string;
  finalTime: string;
}

interface Contact {
  label: string;
  email: string;
}

// Define the initial state using that type
const initialState: CreatePropertyState = {
  operationType: "SALE",
  style: undefined,
  youtubeLinks: [],
  amenities: [],
  materials: [],
  securities: [],
  contacts: [],
  openHouses: [],
  propertyType: undefined,
  address: {
    country: "",
    state: "",
    city: "",
    street: "",
    number: 0,
    coordinates: { lat: 0, long: 0 },
  },
  addressDropdowns: {
    state: undefined,
    city: undefined,
    town: undefined,
  },
  basicInfo: {
    expenses: 0,
    price: 0,
    title: "",
  },
  characteristics: {
    constructionYear: 0,
    coveredSurface: 0,
    floors: 0,
    fullBaths: 0,
    parkDescription: "",
    rooms: 0,
    toilets: 0,
    totalSurface: 0,
    environments: 0,
  },
  additional: {
    description: "",
  },
  currentStep: Step.BasicInfo,
};

export const createPropertyFormSlice = createSlice({
  name: "createPropertyForm",

  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    setStep: (state, action: PayloadAction<Step>) => {
      state.currentStep = action.payload;
    },
    setStyle: (state, action: PayloadAction<string>) => {
      state.style = action.payload;
    },
    addYoutubeLink: (state, action: PayloadAction<string>) => {
      state.youtubeLinks.push(action.payload);
    },
    addAmenity: (state, action: PayloadAction<string>) => {
      state.amenities.push(action.payload);
    },
    addMaterial: (state, action: PayloadAction<string>) => {
      state.materials.push(action.payload);
    },
    addSecurity: (state, action: PayloadAction<string>) => {
      state.securities.push(action.payload);
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    addOpenHouse: (state, action: PayloadAction<OpenHouse>) => {
      state.openHouses.push(action.payload);
    },
    setPropertyType: (state, action: PayloadAction<string>) => {
      state.propertyType = action.payload;
    },
    setAddress: (state, action: PayloadAction<AddressFormData>) => {
      state.address = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.addressDropdowns.state = action.payload;
    },
    setCity: (state, action: PayloadAction<string | undefined>) => {
      state.addressDropdowns.city = action.payload;
    },
    setTown: (state, action: PayloadAction<string | undefined>) => {
      state.addressDropdowns.town = action.payload;
    },
    setBasicInfo: (state, action: PayloadAction<BasicInfoFormData>) => {
      state.basicInfo = action.payload;
    },
    removeAmenity: (state, action: PayloadAction<string>) => {
      state.amenities = state.amenities.filter((id) => id !== action.payload);
    },
    removeSecurity: (state, action: PayloadAction<string>) => {
      state.securities = state.securities.filter((id) => id !== action.payload);
    },
    removeMaterial: (state, action: PayloadAction<string>) => {
      state.materials = state.materials.filter((id) => id !== action.payload);
    },
    setCharacteristics: (
      state,
      action: PayloadAction<CharacteristicsFormData>
    ) => {
      state.characteristics = action.payload;
    },

    setAdditional: (state, action: PayloadAction<AdditionalFormData>) => {
      state.additional = action.payload;
    },
    setOperationType: (state, action: PayloadAction<string>) => {
      state.operationType = action.payload;
    },
    removeYoutubeLink: (state, action: PayloadAction<string>) => {
      state.youtubeLinks = state.youtubeLinks.filter(
        (link) => link !== action.payload
      );
    },
    removeContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(
        ({ email }) => email !== action.payload
      );
    },
    removeOpenHouseDate: (state, action: PayloadAction<OpenHouse>) => {
      state.openHouses = state.openHouses.filter(
        (openHouse) => !isEqualObjects(openHouse, action.payload)
      );
    },
  },
});

export const createPropertyFormReducer = {
  createPropertyForm: createPropertyFormSlice.reducer,
};

export const createPropertyFormActions = {
  createPropertyForm: createPropertyFormSlice.actions,
};

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentStep = (state: RootState) =>
  state.createPropertyForm.currentStep;

export const selectYoutubeLinks = (state: RootState) =>
  state.createPropertyForm.youtubeLinks;

export const selectAmenities = (state: RootState) =>
  state.createPropertyForm.amenities;

export const selectMaterials = (state: RootState) =>
  state.createPropertyForm.materials;

export const selectSecurities = (state: RootState) =>
  state.createPropertyForm.securities;

export const selectContacts = (state: RootState) =>
  state.createPropertyForm.contacts;

export const selectPropertyTypes = (state: RootState) =>
  state.createPropertyForm.propertyType;

export const selectOperationType = (state: RootState) =>
  state.createPropertyForm.operationType;

export const selectAddress = (state: RootState) =>
  state.createPropertyForm.address;

export const selectCreatePropertyState = (state: RootState) =>
  state.createPropertyForm;

export const selectOpenHouses = (state: RootState) =>
  state.createPropertyForm.openHouses;
