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
  userProfile: "/userProfile",
};

export const errorMessages = {
  required: "Este campo es requerido!",
  email: "El Email no es valido!",
};
