import { useParams } from "react-router-dom";
import styles from "./ViewProperty.module.scss";
import { Typography } from "@material-ui/core";
import { TabsBar } from "../../components/common/tabsBar/TabsBar";
import { useState } from "react";
import pluralize from "pluralize";
import { useGetPropertyUsingGET } from "../../api/generated/property-controller/property-controller";
import {
  buildTabs,
  CharacterContainerTab,
  CharacteristicsItems,
  translateCondition,
} from "./viewPropertyUtils";
import { Address } from "../../api/generated/endpoints.schemas";
import { formatPrice } from "../../utils/utils";

export const ViewProperty = () => {
  const { id } = useParams<{ id: string }>();

  const { data: property, isLoading } = useGetPropertyUsingGET(id);

  if (isLoading) return <h4>Loading...</h4>;
  if (!property) return <h4>Error</h4>;

  const characteristicsTabs = buildTabs(
    property.amenities,
    property.materials,
    property.security
  );
  return (
    <div className={styles.container}>
      <div className={styles.mediaContainer}>
        <h4>Fotos</h4>
        <div className={styles.comingSoon}>
          <h3>Proximamente...</h3>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.leftInfo}>
          <div className={styles.divider} />
          <div className={styles.firstSection}>
            <Typography variant={"h5"} className={styles.mainTitle}>
              {property.address.street} {property.address.number}{" "}
              {property.address?.department ?? ""} {property.address.town.name}
            </Typography>
            <div className={styles.facts}>
              <Typography>{property.type}</Typography>
              <Typography>Estilo {property.style.label}</Typography>
              <Typography>{property.squareFoot} m² Total</Typography>
              <Typography>{property.coveredSquareFoot} m² Cubierta</Typography>
              <Typography>
                {pluralize("Ambiente", property.environments, true)}
              </Typography>
              <Typography>
                {pluralize("Baño", property.fullBaths, true)}
              </Typography>
              <Typography>
                {pluralize("Toilets", property.toilets, true)}
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
          <div className={styles.divider} />
          <div className={styles.secondSection}>
            <h4 className={styles.sectionTitle}>{property.title}</h4>
            <div className={styles.body}>
              <div>
                <span>{property.comments}</span>
              </div>
              <div>
                <span>{property.parkDescription}</span>
              </div>
            </div>
          </div>

          {characteristicsTabs.length > 0 && (
            <div>
              <div className={styles.divider} />
              <div className={styles.thirdSection}>
                <CharacteristicsContainer tabs={characteristicsTabs} />
              </div>
            </div>
          )}

          <div className={styles.divider} />
          <div className={styles.addressSection}>
            <AddressSection address={property.address} />
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.priceSection}>
            <h2 className={styles.condition}>
              {translateCondition(property.condition)}
            </h2>
            <h3 className={styles.price}>
              <span className={styles.priceSymbol}>$</span>{" "}
              <span className={styles.priceColor}>
                {formatPrice(property.price)}
              </span>
            </h3>
            <div className={styles.expenses}>
              <span>Expensas </span>{" "}
              <div>
                <span className={styles.priceSymbol}>$</span>
                <span className={styles.priceColor}>
                  {formatPrice(property.expenses)}
                </span>
              </div>
            </div>
          </div>
          <div>
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
};

interface CharacteristicsContainerProps {
  tabs: CharacterContainerTab[];
}

const CharacteristicsContainer = ({ tabs }: CharacteristicsContainerProps) => {
  const [currentBarItem, setCurrentBarItem] = useState(tabs[0]);
  return (
    <div>
      <h4 className={styles.sectionTitle}>Caracteristicas</h4>
      <div className={styles.tabSection}>
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
  items: CharacteristicsItems;
}

const CharacteristicsTab = ({ items }: CharacteristicsTabProps) => {
  return (
    <>
      {items.map(({ value, displayName }) => (
        <div key={value} className={styles.tabBodyItem}>
          <div className={styles.bulletPoint} />
          <span>{displayName}</span>
        </div>
      ))}
    </>
  );
};

interface AddressSectionProps {
  address: Address;
}

const AddressSection = ({ address }: AddressSectionProps) => {
  return (
    <div>
      <h4 className={styles.sectionTitle}>Direccion</h4>
      <div className={styles.addressItemsSection}>
        <div>
          {getAddressItem("Pais", address.town.city.state.country.name)}
          {getAddressItem("Provincia", address.town.city.state.name)}
          {getAddressItem("Ciudad", address.town.city.name)}
          {getAddressItem("Barrio", address.town.name)}
        </div>
        <div>
          {getAddressItem("Calle", address.street)}
          {getAddressItem("Numero", address.number.toString())}
          {getAddressItem("Departamento", address.department)}
          {getAddressItem("Codigo Postal", address.postalCode)}
        </div>
      </div>
    </div>
  );
};

const getAddressItem = (name: string, value: string) => {
  return (
    <div className={styles.addressItem}>
      <div className={styles.addressItemLabel}>
        <h5>{name}: </h5>
      </div>
      <div className={styles.addressItemValue}>
        <span>{value}</span>
      </div>
    </div>
  );
};

const ContactSection = () => {
  return <div className={styles.contactSection}>contacts</div>;
};
