import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Define a type for the slice state
interface CreatePropertyState {
  youtubeLinks: string[];
  amenities: Label[];
  materials: Label[];
  securities: Label[];
  contacts: Contact[];
  openHouses: OpenHouse[];
}

interface Label {
  label: string;
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
  youtubeLinks: [],
  amenities: [],
  materials: [],
  securities: [],
  contacts: [],
  openHouses: [],
};

export const createPropertyFormSlice = createSlice({
  name: "createPropertyForm",

  initialState,
  reducers: {
    addYoutubeLink: (state, action: PayloadAction<string>) => {
      state.youtubeLinks.push(action.payload);
    },
    addAmenity: (state, action: PayloadAction<string>) => {
      state.amenities.push({ label: action.payload });
    },
    addMaterial: (state, action: PayloadAction<string>) => {
      state.materials.push({ label: action.payload });
    },
    addSecurity: (state, action: PayloadAction<string>) => {
      state.securities.push({ label: action.payload });
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    addOpenHouse: (state, action: PayloadAction<OpenHouse>) => {
      state.openHouses.push(action.payload);
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
export const selectYoutubeLinks = (state: RootState) =>
  state.createPropertyForm.youtubeLinks;

export const selectAmenities = (state: RootState) =>
  state.createPropertyForm.amenities.map((a) => a.label);

export const selectMaterials = (state: RootState) =>
  state.createPropertyForm.materials.map((a) => a.label);

export const selectSecurities = (state: RootState) =>
  state.createPropertyForm.securities.map((a) => a.label);

export const selectContacts = (state: RootState) =>
  state.createPropertyForm.contacts;
