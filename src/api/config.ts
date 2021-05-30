import axios from "axios";

export const configureAxios = () =>
  (axios.defaults.baseURL = "http://localhost:8080");
