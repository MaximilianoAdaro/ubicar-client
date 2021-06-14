import Axios, { AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({ baseURL: "" });

export const customInstance = async <T>(
  config: AxiosRequestConfig,
  options: AxiosRequestConfig
): Promise<T> => {
  const { data } = await AXIOS_INSTANCE({ ...config, ...options });
  return data;
};

export default customInstance;
