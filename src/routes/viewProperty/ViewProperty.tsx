import { useParams } from "react-router-dom";
import { useGetPropertyById } from "../../api/property";
import styles from "./ViewProperty.module.scss";
import { Divider, Grid, Typography } from "@material-ui/core";
import { TabsBar } from "../../components/common/tabsBar/TabsBar";
import { useState } from "react";
import {
  Amenity,
  ConstructionMaterial,
  PropertyDTOConditionEnum,
  SecurityMeasure,
} from "../../generated/api";
import pluralize from "pluralize";

const buildSingleTab = ({
  value,
  displayName,
  data,
}: {
  value: string;
  displayName: string;
  data?: CharacteristicsTabProps["items"];
}): CharacterContainerTab | undefined => {
  if (!data || data.length === 0) return undefined;

  return {
    value,
    displayName,
    data,
  };
};

const buildTabs = (
  services?: Amenity[],
  materials?: ConstructionMaterial[],
  securities?: SecurityMeasure[]
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

export const ViewProperty = () => {
  const { id } = useParams<{ id: string }>();

  const { data: property, isLoading } = useGetPropertyById(id);

  if (isLoading) return <h4>Loading...</h4>;
  if (!property) return <h4>Error</h4>;

  return (
    <div>
      <div className={styles.container}>
        <h4>Fotos</h4>
        <div className={styles.comingSoon}>
          <h3>Proximamente...</h3>
        </div>
      </div>
      <Grid container>
        <Grid item xs={8}>
          <Divider />
          <div>
            <Typography variant={"h5"}>
              {property.address?.department ?? ""} {property.address.street}{" "}
              {property.address.number}, {property.address.town.name}
            </Typography>
            <div>
              <Typography>{property.type}</Typography>
              <Typography>Estilo {property.style.label}</Typography>
              <Typography>{property.squareFoot} m2 Total</Typography>
              <Typography>{property.coveredSquareFoot} m2 Cubierta</Typography>
              <Typography>
                {pluralize("Ambiente", property.environments, true)}
              </Typography>
              <Typography>
                {pluralize("Baño", property.fullBaths, true)}
              </Typography>
              <Typography>
                {pluralize("Piso", property.levels, true)}
              </Typography>
              <Typography>
                {pluralize("Cuarto", property.rooms, true)}
              </Typography>
              <Typography>
                {pluralize("Año", property.constructionDate, true)} de
                antiguedad
              </Typography>
            </div>
          </div>
          <Divider />
          <div>
            <Typography variant={"h6"}>{property.title}</Typography>
            <Typography variant={"body2"}>{property.comments}</Typography>
            {
              <Typography variant={"body2"}>
                {property.parkDescription}
              </Typography>
            }
          </div>
          <Divider />
          <div>
            <CharacteristicsContainer
              tabs={buildTabs(
                property.amenities,
                property.materials,
                property.security
              )}
            />
          </div>
        </Grid>
        <Grid item xs>
          <div>
            <Typography>{translate(property.condition)}</Typography>
            <Typography>$ {property.price}</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const translations = {
  [PropertyDTOConditionEnum.Rent]: "Alquiler",
  [PropertyDTOConditionEnum.Sale]: "Venta",
};

const translate = (condition: PropertyDTOConditionEnum): string => {
  return translations[condition];
};

interface CharacterContainerTab {
  value: string;
  displayName: string;
  data: CharacteristicsTabProps["items"];
}

interface CharacteristicsContainerProps {
  tabs: CharacterContainerTab[];
}

const CharacteristicsContainer = ({ tabs }: CharacteristicsContainerProps) => {
  const [currentBarItem, setCurrentBarItem] = useState(tabs[0]);
  return (
    <div>
      <Typography variant={"subtitle1"}>Caracteristicas</Typography>
      <div>
        <TabsBar
          items={tabs}
          current={currentBarItem.value}
          onClick={(tabBarItem) => {
            const tab =
              tabs.find((tab) => tab.value === tabBarItem.value) ?? tabs[0];
            setCurrentBarItem(tab);
          }}
          additionalClasses={{
            container: styles.tabsBarContainerAdditional,
          }}
        />
        <div className={styles.characteristicsItemsContainer}>
          <CharacteristicsTab items={currentBarItem.data} />
        </div>
      </div>
    </div>
  );
};

interface CharacteristicsTabProps {
  items: { value: string; displayName: string }[];
}

const CharacteristicsTab = ({ items }: CharacteristicsTabProps) => {
  return (
    <>
      {items.map(({ value, displayName }) => (
        <span key={value}>{displayName}</span>
      ))}
    </>
  );
};
