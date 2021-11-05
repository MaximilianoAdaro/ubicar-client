export const urls = {
  signUp: "/signup",
  logIn: "/login",
  home: "/",
  notFound: "/notfound",
  createProperty: "/create-property",
  listingPage: "/listing-page",
  viewProperty: {
    path: "/view-property/:id",
    byId: (id: string) => `/view-property/${id}`,
  },
  editProperty: {
    path: "/edit-property/:id",
    byId: (id: string) => `/edit-property/${id}`,
  },
  userProfile: {
    path: "/userProfile",
    personalData: "/userProfile/personal-data",
    favorites: "/userProfile/my-favorites",
    properties: "/userProfile/my-properties",
    recentlyViewed: "/userProfile/recently-viewed",
  },
};

export const errorMessages = {
  required: "Este campo es requerido!",
  email: "El email no es valido!",
  number: "Debe ser un numero",
  positiveNumber: "El numero debe ser positvo",
  integerNumber: "El numero debe ser entero",
};
