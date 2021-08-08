/*
 * Generated by orval v5.4.8 🍺
 * Do not edit manually.
 * Api Documentation
 * Api Documentation
 * OpenAPI spec version: 1.0
 */
export interface Address {
  city: City;
  coordinates: Coordinates;
  id: string;
  number: number;
  street: string;
}

export interface AddressDTO {
  city: string;
  coordinates: CoordinatesDTO;
  country: string;
  number: number;
  state: string;
  street: string;
}

export interface AddressDTOReq {
  city: string;
  coordinates: CoordinatesDTOReq;
  country: string;
  number?: number;
  state: string;
  street: string;
}

export interface AddressDTORes {
  city: string;
  coordinates: CoordinatesDTORes;
  country: string;
  number: number;
  state: string;
  street: string;
}

export interface Amenity {
  id: string;
  label: string;
  properties: Property[];
}

export interface AmenityDTO {
  id: string;
  label: string;
}

export interface City {
  id: string;
  name: string;
  state: State;
}

export interface CityDTO {
  id: string;
  name: string;
}

export interface ConstructionMaterial {
  id: string;
  label: string;
  properties: Property[];
}

export interface Contact {
  email: string;
  id: string;
  label: string;
}

export interface ContactDto {
  email: string;
  label: string;
}

export interface ContactDtoReq {
  email: string;
  label: string;
}

export interface ContactDtoRes {
  email: string;
  label: string;
}

export interface Coordinates {
  id: string;
  lat: number;
  long: number;
}

export interface CoordinatesDTO {
  lat: number;
  long: number;
}

export interface CoordinatesDTOReq {
  lat?: number;
  long?: number;
}

export interface CoordinatesDTORes {
  lat: number;
  long: number;
}

export interface Country {
  id: string;
  name: string;
}

export interface CreatePropertyDTO {
  address: AddressDTOReq;
  amenities: string[];
  comments: string;
  condition: string;
  constructionDate?: number;
  contacts: ContactDtoReq[];
  coveredSquareFoot?: number;
  environments?: number;
  expenses?: number;
  fullBaths?: number;
  levels?: number;
  links: string[];
  materials: string[];
  openHouse: OpenHouseDateDtoReq[];
  parkDescription: string;
  price?: number;
  rooms?: number;
  security: string[];
  squareFoot?: number;
  style: string;
  title: string;
  toilets?: number;
  type: string;
}

export interface GoogleLoginUserDTO {
  email: string;
  name: string;
}

export interface LogInUserDTO {
  email: string;
  password: string;
}

export interface MaterialDTO {
  id: string;
  label: string;
}

export type ModelAndViewModel = {};

export type ModelAndViewModelMap = { [key: string]: {} };

export type ModelAndViewStatus =
  | "ACCEPTED"
  | "ALREADY_REPORTED"
  | "BAD_GATEWAY"
  | "BAD_REQUEST"
  | "BANDWIDTH_LIMIT_EXCEEDED"
  | "CHECKPOINT"
  | "CONFLICT"
  | "CONTINUE"
  | "CREATED"
  | "DESTINATION_LOCKED"
  | "EXPECTATION_FAILED"
  | "FAILED_DEPENDENCY"
  | "FORBIDDEN"
  | "FOUND"
  | "GATEWAY_TIMEOUT"
  | "GONE"
  | "HTTP_VERSION_NOT_SUPPORTED"
  | "IM_USED"
  | "INSUFFICIENT_SPACE_ON_RESOURCE"
  | "INSUFFICIENT_STORAGE"
  | "INTERNAL_SERVER_ERROR"
  | "I_AM_A_TEAPOT"
  | "LENGTH_REQUIRED"
  | "LOCKED"
  | "LOOP_DETECTED"
  | "METHOD_FAILURE"
  | "METHOD_NOT_ALLOWED"
  | "MOVED_PERMANENTLY"
  | "MOVED_TEMPORARILY"
  | "MULTIPLE_CHOICES"
  | "MULTI_STATUS"
  | "NETWORK_AUTHENTICATION_REQUIRED"
  | "NON_AUTHORITATIVE_INFORMATION"
  | "NOT_ACCEPTABLE"
  | "NOT_EXTENDED"
  | "NOT_FOUND"
  | "NOT_IMPLEMENTED"
  | "NOT_MODIFIED"
  | "NO_CONTENT"
  | "OK"
  | "PARTIAL_CONTENT"
  | "PAYLOAD_TOO_LARGE"
  | "PAYMENT_REQUIRED"
  | "PERMANENT_REDIRECT"
  | "PRECONDITION_FAILED"
  | "PRECONDITION_REQUIRED"
  | "PROCESSING"
  | "PROXY_AUTHENTICATION_REQUIRED"
  | "REQUESTED_RANGE_NOT_SATISFIABLE"
  | "REQUEST_ENTITY_TOO_LARGE"
  | "REQUEST_HEADER_FIELDS_TOO_LARGE"
  | "REQUEST_TIMEOUT"
  | "REQUEST_URI_TOO_LONG"
  | "RESET_CONTENT"
  | "SEE_OTHER"
  | "SERVICE_UNAVAILABLE"
  | "SWITCHING_PROTOCOLS"
  | "TEMPORARY_REDIRECT"
  | "TOO_EARLY"
  | "TOO_MANY_REQUESTS"
  | "UNAUTHORIZED"
  | "UNAVAILABLE_FOR_LEGAL_REASONS"
  | "UNPROCESSABLE_ENTITY"
  | "UNSUPPORTED_MEDIA_TYPE"
  | "UPGRADE_REQUIRED"
  | "URI_TOO_LONG"
  | "USE_PROXY"
  | "VARIANT_ALSO_NEGOTIATES";

export const ModelAndViewStatus = {
  ACCEPTED: "ACCEPTED" as ModelAndViewStatus,
  ALREADY_REPORTED: "ALREADY_REPORTED" as ModelAndViewStatus,
  BAD_GATEWAY: "BAD_GATEWAY" as ModelAndViewStatus,
  BAD_REQUEST: "BAD_REQUEST" as ModelAndViewStatus,
  BANDWIDTH_LIMIT_EXCEEDED: "BANDWIDTH_LIMIT_EXCEEDED" as ModelAndViewStatus,
  CHECKPOINT: "CHECKPOINT" as ModelAndViewStatus,
  CONFLICT: "CONFLICT" as ModelAndViewStatus,
  CONTINUE: "CONTINUE" as ModelAndViewStatus,
  CREATED: "CREATED" as ModelAndViewStatus,
  DESTINATION_LOCKED: "DESTINATION_LOCKED" as ModelAndViewStatus,
  EXPECTATION_FAILED: "EXPECTATION_FAILED" as ModelAndViewStatus,
  FAILED_DEPENDENCY: "FAILED_DEPENDENCY" as ModelAndViewStatus,
  FORBIDDEN: "FORBIDDEN" as ModelAndViewStatus,
  FOUND: "FOUND" as ModelAndViewStatus,
  GATEWAY_TIMEOUT: "GATEWAY_TIMEOUT" as ModelAndViewStatus,
  GONE: "GONE" as ModelAndViewStatus,
  HTTP_VERSION_NOT_SUPPORTED:
    "HTTP_VERSION_NOT_SUPPORTED" as ModelAndViewStatus,
  IM_USED: "IM_USED" as ModelAndViewStatus,
  INSUFFICIENT_SPACE_ON_RESOURCE:
    "INSUFFICIENT_SPACE_ON_RESOURCE" as ModelAndViewStatus,
  INSUFFICIENT_STORAGE: "INSUFFICIENT_STORAGE" as ModelAndViewStatus,
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR" as ModelAndViewStatus,
  I_AM_A_TEAPOT: "I_AM_A_TEAPOT" as ModelAndViewStatus,
  LENGTH_REQUIRED: "LENGTH_REQUIRED" as ModelAndViewStatus,
  LOCKED: "LOCKED" as ModelAndViewStatus,
  LOOP_DETECTED: "LOOP_DETECTED" as ModelAndViewStatus,
  METHOD_FAILURE: "METHOD_FAILURE" as ModelAndViewStatus,
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED" as ModelAndViewStatus,
  MOVED_PERMANENTLY: "MOVED_PERMANENTLY" as ModelAndViewStatus,
  MOVED_TEMPORARILY: "MOVED_TEMPORARILY" as ModelAndViewStatus,
  MULTIPLE_CHOICES: "MULTIPLE_CHOICES" as ModelAndViewStatus,
  MULTI_STATUS: "MULTI_STATUS" as ModelAndViewStatus,
  NETWORK_AUTHENTICATION_REQUIRED:
    "NETWORK_AUTHENTICATION_REQUIRED" as ModelAndViewStatus,
  NON_AUTHORITATIVE_INFORMATION:
    "NON_AUTHORITATIVE_INFORMATION" as ModelAndViewStatus,
  NOT_ACCEPTABLE: "NOT_ACCEPTABLE" as ModelAndViewStatus,
  NOT_EXTENDED: "NOT_EXTENDED" as ModelAndViewStatus,
  NOT_FOUND: "NOT_FOUND" as ModelAndViewStatus,
  NOT_IMPLEMENTED: "NOT_IMPLEMENTED" as ModelAndViewStatus,
  NOT_MODIFIED: "NOT_MODIFIED" as ModelAndViewStatus,
  NO_CONTENT: "NO_CONTENT" as ModelAndViewStatus,
  OK: "OK" as ModelAndViewStatus,
  PARTIAL_CONTENT: "PARTIAL_CONTENT" as ModelAndViewStatus,
  PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE" as ModelAndViewStatus,
  PAYMENT_REQUIRED: "PAYMENT_REQUIRED" as ModelAndViewStatus,
  PERMANENT_REDIRECT: "PERMANENT_REDIRECT" as ModelAndViewStatus,
  PRECONDITION_FAILED: "PRECONDITION_FAILED" as ModelAndViewStatus,
  PRECONDITION_REQUIRED: "PRECONDITION_REQUIRED" as ModelAndViewStatus,
  PROCESSING: "PROCESSING" as ModelAndViewStatus,
  PROXY_AUTHENTICATION_REQUIRED:
    "PROXY_AUTHENTICATION_REQUIRED" as ModelAndViewStatus,
  REQUESTED_RANGE_NOT_SATISFIABLE:
    "REQUESTED_RANGE_NOT_SATISFIABLE" as ModelAndViewStatus,
  REQUEST_ENTITY_TOO_LARGE: "REQUEST_ENTITY_TOO_LARGE" as ModelAndViewStatus,
  REQUEST_HEADER_FIELDS_TOO_LARGE:
    "REQUEST_HEADER_FIELDS_TOO_LARGE" as ModelAndViewStatus,
  REQUEST_TIMEOUT: "REQUEST_TIMEOUT" as ModelAndViewStatus,
  REQUEST_URI_TOO_LONG: "REQUEST_URI_TOO_LONG" as ModelAndViewStatus,
  RESET_CONTENT: "RESET_CONTENT" as ModelAndViewStatus,
  SEE_OTHER: "SEE_OTHER" as ModelAndViewStatus,
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE" as ModelAndViewStatus,
  SWITCHING_PROTOCOLS: "SWITCHING_PROTOCOLS" as ModelAndViewStatus,
  TEMPORARY_REDIRECT: "TEMPORARY_REDIRECT" as ModelAndViewStatus,
  TOO_EARLY: "TOO_EARLY" as ModelAndViewStatus,
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS" as ModelAndViewStatus,
  UNAUTHORIZED: "UNAUTHORIZED" as ModelAndViewStatus,
  UNAVAILABLE_FOR_LEGAL_REASONS:
    "UNAVAILABLE_FOR_LEGAL_REASONS" as ModelAndViewStatus,
  UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY" as ModelAndViewStatus,
  UNSUPPORTED_MEDIA_TYPE: "UNSUPPORTED_MEDIA_TYPE" as ModelAndViewStatus,
  UPGRADE_REQUIRED: "UPGRADE_REQUIRED" as ModelAndViewStatus,
  URI_TOO_LONG: "URI_TOO_LONG" as ModelAndViewStatus,
  USE_PROXY: "USE_PROXY" as ModelAndViewStatus,
  VARIANT_ALSO_NEGOTIATES: "VARIANT_ALSO_NEGOTIATES" as ModelAndViewStatus,
};

export interface ModelAndView {
  empty?: boolean;
  model?: ModelAndViewModel;
  modelMap?: ModelAndViewModelMap;
  reference?: boolean;
  status?: ModelAndViewStatus;
  view?: View;
  viewName?: string;
}

export interface OpenHouseDate {
  day: string;
  finalTime: string;
  id: string;
  initialTime: string;
}

export interface OpenHouseDateDto {
  day: string;
  finalTime: string;
  initialTime: string;
}

export interface OpenHouseDateDtoReq {
  day: string;
  finalTime: string;
  initialTime: string;
}

export interface OpenHouseDateDtoRes {
  day: string;
  finalTime: string;
  initialTime: string;
}

export interface Pageable {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
}

export interface Permission {
  active: boolean;
  creationDate: string;
  description: string;
  id: string;
  slug: string;
  title: string;
  userRoles: UserRole[];
}

export type PropertyCondition = "RENT" | "SALE";

export const PropertyCondition = {
  RENT: "RENT" as PropertyCondition,
  SALE: "SALE" as PropertyCondition,
};

export type PropertyType =
  | "Casa"
  | "Cochera"
  | "Compartido"
  | "Consultorio"
  | "Country"
  | "Departamento"
  | "Edificio"
  | "Flat"
  | "Galpon"
  | "Hotel"
  | "Local"
  | "Loft"
  | "Oficina"
  | "PH"
  | "Quinta"
  | "Terreno";

export const PropertyType = {
  Casa: "Casa" as PropertyType,
  Cochera: "Cochera" as PropertyType,
  Compartido: "Compartido" as PropertyType,
  Consultorio: "Consultorio" as PropertyType,
  Country: "Country" as PropertyType,
  Departamento: "Departamento" as PropertyType,
  Edificio: "Edificio" as PropertyType,
  Flat: "Flat" as PropertyType,
  Galpon: "Galpon" as PropertyType,
  Hotel: "Hotel" as PropertyType,
  Local: "Local" as PropertyType,
  Loft: "Loft" as PropertyType,
  Oficina: "Oficina" as PropertyType,
  PH: "PH" as PropertyType,
  Quinta: "Quinta" as PropertyType,
  Terreno: "Terreno" as PropertyType,
};

export interface Property {
  address: Address;
  amenities: Amenity[];
  comments: string;
  condition: PropertyCondition;
  constructionDate: number;
  contacts: Contact[];
  coveredSquareFoot: number;
  creationDate: string;
  environments: number;
  expenses: number;
  fullBaths: number;
  id: string;
  levels: number;
  likes: User[];
  links: string[];
  materials: ConstructionMaterial[];
  openHouse: OpenHouseDate[];
  owner: User;
  parkDescription: string;
  price: number;
  rooms: number;
  security: SecurityMeasure[];
  squareFoot: number;
  style: Style;
  title: string;
  toilets: number;
  type: PropertyType;
}

export type PropertyDTOCondition = "RENT" | "SALE";

export const PropertyDTOCondition = {
  RENT: "RENT" as PropertyDTOCondition,
  SALE: "SALE" as PropertyDTOCondition,
};

export type PropertyDTOType =
  | "Casa"
  | "Cochera"
  | "Compartido"
  | "Consultorio"
  | "Country"
  | "Departamento"
  | "Edificio"
  | "Flat"
  | "Galpon"
  | "Hotel"
  | "Local"
  | "Loft"
  | "Oficina"
  | "PH"
  | "Quinta"
  | "Terreno";

export const PropertyDTOType = {
  Casa: "Casa" as PropertyDTOType,
  Cochera: "Cochera" as PropertyDTOType,
  Compartido: "Compartido" as PropertyDTOType,
  Consultorio: "Consultorio" as PropertyDTOType,
  Country: "Country" as PropertyDTOType,
  Departamento: "Departamento" as PropertyDTOType,
  Edificio: "Edificio" as PropertyDTOType,
  Flat: "Flat" as PropertyDTOType,
  Galpon: "Galpon" as PropertyDTOType,
  Hotel: "Hotel" as PropertyDTOType,
  Local: "Local" as PropertyDTOType,
  Loft: "Loft" as PropertyDTOType,
  Oficina: "Oficina" as PropertyDTOType,
  PH: "PH" as PropertyDTOType,
  Quinta: "Quinta" as PropertyDTOType,
  Terreno: "Terreno" as PropertyDTOType,
};

export interface PropertyDTO {
  address: AddressDTO;
  amenities: Amenity[];
  comments: string;
  condition: PropertyDTOCondition;
  constructionDate: number;
  contacts: ContactDto[];
  coveredSquareFoot: number;
  environments: number;
  expenses: number;
  fullBaths: number;
  id: string;
  levels: number;
  liked: boolean;
  links: string[];
  materials: MaterialDTO[];
  openHouse: OpenHouseDateDto[];
  parkDescription: string;
  price: number;
  rooms: number;
  security: SecurityDTO[];
  squareFoot: number;
  style: Style;
  title: string;
  toilets: number;
  type: PropertyDTOType;
}

export type PropertyFilterDtoCondition = "RENT" | "SALE";

export const PropertyFilterDtoCondition = {
  RENT: "RENT" as PropertyFilterDtoCondition,
  SALE: "SALE" as PropertyFilterDtoCondition,
};

export type PropertyFilterDtoTypeProperty =
  | "Casa"
  | "Cochera"
  | "Compartido"
  | "Consultorio"
  | "Country"
  | "Departamento"
  | "Edificio"
  | "Flat"
  | "Galpon"
  | "Hotel"
  | "Local"
  | "Loft"
  | "Oficina"
  | "PH"
  | "Quinta"
  | "Terreno";

export const PropertyFilterDtoTypeProperty = {
  Casa: "Casa" as PropertyFilterDtoTypeProperty,
  Cochera: "Cochera" as PropertyFilterDtoTypeProperty,
  Compartido: "Compartido" as PropertyFilterDtoTypeProperty,
  Consultorio: "Consultorio" as PropertyFilterDtoTypeProperty,
  Country: "Country" as PropertyFilterDtoTypeProperty,
  Departamento: "Departamento" as PropertyFilterDtoTypeProperty,
  Edificio: "Edificio" as PropertyFilterDtoTypeProperty,
  Flat: "Flat" as PropertyFilterDtoTypeProperty,
  Galpon: "Galpon" as PropertyFilterDtoTypeProperty,
  Hotel: "Hotel" as PropertyFilterDtoTypeProperty,
  Local: "Local" as PropertyFilterDtoTypeProperty,
  Loft: "Loft" as PropertyFilterDtoTypeProperty,
  Oficina: "Oficina" as PropertyFilterDtoTypeProperty,
  PH: "PH" as PropertyFilterDtoTypeProperty,
  Quinta: "Quinta" as PropertyFilterDtoTypeProperty,
  Terreno: "Terreno" as PropertyFilterDtoTypeProperty,
};

export interface PropertyFilterDto {
  condition?: PropertyFilterDtoCondition;
  containsYard?: boolean;
  maxAmountBathroom?: number;
  maxAmountRoom?: number;
  maxAmountSquareMeter?: number;
  maxPrice?: number;
  minAmountBathroom?: number;
  minAmountRoom?: number;
  minAmountSquareMeter?: number;
  minPrice?: number;
  style?: StyleDTO;
  typeProperty?: PropertyFilterDtoTypeProperty;
}

export type PropertyPreviewDTOCondition = "RENT" | "SALE";

export const PropertyPreviewDTOCondition = {
  RENT: "RENT" as PropertyPreviewDTOCondition,
  SALE: "SALE" as PropertyPreviewDTOCondition,
};

export type PropertyPreviewDTOType =
  | "Casa"
  | "Cochera"
  | "Compartido"
  | "Consultorio"
  | "Country"
  | "Departamento"
  | "Edificio"
  | "Flat"
  | "Galpon"
  | "Hotel"
  | "Local"
  | "Loft"
  | "Oficina"
  | "PH"
  | "Quinta"
  | "Terreno";

export const PropertyPreviewDTOType = {
  Casa: "Casa" as PropertyPreviewDTOType,
  Cochera: "Cochera" as PropertyPreviewDTOType,
  Compartido: "Compartido" as PropertyPreviewDTOType,
  Consultorio: "Consultorio" as PropertyPreviewDTOType,
  Country: "Country" as PropertyPreviewDTOType,
  Departamento: "Departamento" as PropertyPreviewDTOType,
  Edificio: "Edificio" as PropertyPreviewDTOType,
  Flat: "Flat" as PropertyPreviewDTOType,
  Galpon: "Galpon" as PropertyPreviewDTOType,
  Hotel: "Hotel" as PropertyPreviewDTOType,
  Local: "Local" as PropertyPreviewDTOType,
  Loft: "Loft" as PropertyPreviewDTOType,
  Oficina: "Oficina" as PropertyPreviewDTOType,
  PH: "PH" as PropertyPreviewDTOType,
  Quinta: "Quinta" as PropertyPreviewDTOType,
  Terreno: "Terreno" as PropertyPreviewDTOType,
};

export interface PropertyPreviewDTO {
  address: AddressDTO;
  condition: PropertyPreviewDTOCondition;
  coveredSquareFoot: number;
  fullBaths: number;
  id: string;
  price: number;
  rooms: number;
  squareFoot: number;
  title: string;
  toilets: number;
  type: PropertyPreviewDTOType;
}

export interface RoleDTO {
  id: string;
  title: string;
}

export interface SecurityDTO {
  id: string;
  label: string;
}

export interface SecurityMeasure {
  id: string;
  label: string;
  properties: Property[];
}

export interface Sort {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
}

export interface State {
  country: Country;
  id: string;
  name: string;
}

export interface StateDTO {
  id: string;
  name: string;
}

export interface Style {
  id: string;
  label: string;
}

export interface StyleDTO {
  id: string;
  label: string;
}

// tslint:disable-next-line:no-empty-interface
export interface Unit {}

export type UserUserOrigin = "GOOGLE" | "UBICAR";

export const UserUserOrigin = {
  GOOGLE: "GOOGLE" as UserUserOrigin,
  UBICAR: "UBICAR" as UserUserOrigin,
};

export interface User {
  birthDate?: string;
  email: string;
  id: string;
  likedProperties: Property[];
  password?: string;
  userName: string;
  userOrigin: UserUserOrigin;
  userRole: UserRole;
}

export interface UserContactDto {
  cellphone: string;
  email: string;
  message: string;
  name: string;
}

export interface UserCreationDTO {
  birthDate?: string;
  email: string;
  password?: string;
  userName: string;
  userRole: string;
}

export interface UserDTO {
  email: string;
  id: string;
  userName: string;
}

export interface UserRole {
  active: boolean;
  creationDate: string;
  description: string;
  id: string;
  permissions: Permission[];
  slug: string;
  title: string;
}

export interface View {
  contentType?: string;
}

export interface PagePropertyPreviewDTO {
  content?: PropertyPreviewDTO[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}

export type CreatePropertyDTOBody = CreatePropertyDTO;

export type ErrorUsingGET200 = { [key: string]: {} };

export type ErrorUsingHEAD200 = { [key: string]: {} };

export type ErrorUsingPOST200 = { [key: string]: {} };

export type ErrorUsingPUT200 = { [key: string]: {} };

export type ErrorUsingDELETE200 = { [key: string]: {} };

export type ErrorUsingPATCH200 = { [key: string]: {} };

export type GetTypesUsingGET200Item =
  | "Casa"
  | "Cochera"
  | "Compartido"
  | "Consultorio"
  | "Country"
  | "Departamento"
  | "Edificio"
  | "Flat"
  | "Galpon"
  | "Hotel"
  | "Local"
  | "Loft"
  | "Oficina"
  | "PH"
  | "Quinta"
  | "Terreno";

export const GetTypesUsingGET200Item = {
  Casa: "Casa" as GetTypesUsingGET200Item,
  Cochera: "Cochera" as GetTypesUsingGET200Item,
  Compartido: "Compartido" as GetTypesUsingGET200Item,
  Consultorio: "Consultorio" as GetTypesUsingGET200Item,
  Country: "Country" as GetTypesUsingGET200Item,
  Departamento: "Departamento" as GetTypesUsingGET200Item,
  Edificio: "Edificio" as GetTypesUsingGET200Item,
  Flat: "Flat" as GetTypesUsingGET200Item,
  Galpon: "Galpon" as GetTypesUsingGET200Item,
  Hotel: "Hotel" as GetTypesUsingGET200Item,
  Local: "Local" as GetTypesUsingGET200Item,
  Loft: "Loft" as GetTypesUsingGET200Item,
  Oficina: "Oficina" as GetTypesUsingGET200Item,
  PH: "PH" as GetTypesUsingGET200Item,
  Quinta: "Quinta" as GetTypesUsingGET200Item,
  Terreno: "Terreno" as GetTypesUsingGET200Item,
};

export type GetPropertiesUsingGETParams = { page: number };

export type GetPropertiesFilteredUsingPOSTParams = {
  direction?: GetPropertiesFilteredUsingPOSTDirection;
  page?: number;
  property?: GetPropertiesFilteredUsingPOSTProperty;
  size?: number;
};

export type GetPropertiesFilteredUsingPOSTDirection = "ASC" | "DESC";

export const GetPropertiesFilteredUsingPOSTDirection = {
  ASC: "ASC" as GetPropertiesFilteredUsingPOSTDirection,
  DESC: "DESC" as GetPropertiesFilteredUsingPOSTDirection,
};

export type GetPropertiesFilteredUsingPOSTProperty =
  | "CREATION_DATE"
  | "ID"
  | "PRICE";

export const GetPropertiesFilteredUsingPOSTProperty = {
  CREATION_DATE: "CREATION_DATE" as GetPropertiesFilteredUsingPOSTProperty,
  ID: "ID" as GetPropertiesFilteredUsingPOSTProperty,
  PRICE: "PRICE" as GetPropertiesFilteredUsingPOSTProperty,
};
