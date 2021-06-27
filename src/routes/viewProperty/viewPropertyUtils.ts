import {
  AmenityDTO,
  MaterialDTO,
  PropertyDTOCondition,
  SecurityDTO,
} from "../../api/generated/endpoints.schemas";

export const getYearDistance = (year: number) => {
  return new Date().getFullYear() - year;
};

export type CharacteristicsItems = { value: string; displayName: string }[];

export interface CharacterContainerTab {
  value: string;
  displayName: string;
  data: CharacteristicsItems;
}

export const buildSingleTab = ({
  value,
  displayName,
  data,
}: {
  value: string;
  displayName: string;
  data?: CharacteristicsItems;
}): CharacterContainerTab | undefined => {
  if (!data || data.length === 0) return undefined;

  return {
    value,
    displayName,
    data,
  };
};

export const buildTabs = (
  services?: AmenityDTO[],
  materials?: MaterialDTO[],
  securities?: SecurityDTO[]
): CharacterContainerTab[] => {
  const itemsBuilt = [
    buildSingleTab({
      value: "amenities",
      displayName: "Servicios",
      data: services?.map(({ id, label }) => ({
        value: id,
        displayName: label,
      })),
    }),
    buildSingleTab({
      value: "materials",
      displayName: "Materiales de construccion",
      data: materials?.map(({ id, label }) => ({
        value: id,
        displayName: label,
      })),
    }),
    buildSingleTab({
      value: "securities",
      displayName: "Seguridad",
      data: securities?.map(({ id, label }) => ({
        value: id,
        displayName: label,
      })),
    }),
  ];
  return itemsBuilt.filter((v) => v !== undefined) as CharacterContainerTab[];
};

const conditionTranslations = {
  [PropertyDTOCondition.RENT]: "Alquiler",
  [PropertyDTOCondition.SALE]: "Venta",
};

export const translateCondition = (condition: PropertyDTOCondition): string => {
  return conditionTranslations[condition];
};
