import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { BasicInfoFormData } from "../../../components/createPropertyForm/BasicInfo/BasicInfo";
import { CharacteristicsFormData } from "../../../components/createPropertyForm/Characteristics/Characteristics";
import { AdditionalFormData } from "../../../components/createPropertyForm/Additional/Additional";
import { AddressFormData } from "../../../components/createPropertyForm/Address/Address";

// Define a type for the slice state
export interface CreatePropertyState {
  operationType: string;
  style: number | undefined;
  youtubeLinks: string[];
  amenities: number[];
  materials: number[];
  securities: number[];
  contacts: Contact[];
  openHouses: OpenHouse[];
  propertyType: string | undefined;
  addressDropdowns: {
    state: number | undefined;
    city: number | undefined;
    town: number | undefined;
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

interface OpenHouse {
  day: Date;
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
    street: "",
    number: 0,
    postalCode: "",
    department: "",
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
    setStep: (state, action: PayloadAction<Step>) => {
      state.currentStep = action.payload;
    },
    setStyle: (state, action: PayloadAction<number>) => {
      state.style = action.payload;
    },
    addYoutubeLink: (state, action: PayloadAction<string>) => {
      state.youtubeLinks.push(action.payload);
    },
    addAmenity: (state, action: PayloadAction<number>) => {
      state.amenities.push(action.payload);
    },
    addMaterial: (state, action: PayloadAction<number>) => {
      state.materials.push(action.payload);
    },
    addSecurity: (state, action: PayloadAction<number>) => {
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
    setState: (state, action: PayloadAction<number>) => {
      state.addressDropdowns.state = action.payload;
    },
    setCity: (state, action: PayloadAction<number | undefined>) => {
      state.addressDropdowns.city = action.payload;
    },
    setTown: (state, action: PayloadAction<number | undefined>) => {
      state.addressDropdowns.town = action.payload;
    },
    setBasicInfo: (state, action: PayloadAction<BasicInfoFormData>) => {
      state.basicInfo = action.payload;
    },
    removeAmenity: (state, action: PayloadAction<number>) => {
      state.amenities = state.amenities.filter((id) => id !== action.payload);
    },
    removeSecurity: (state, action: PayloadAction<number>) => {
      state.securities = state.securities.filter((id) => id !== action.payload);
    },
    removeMaterial: (state, action: PayloadAction<number>) => {
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
