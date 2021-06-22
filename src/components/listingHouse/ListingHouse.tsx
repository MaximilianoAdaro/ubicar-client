import styles from "./ListingHouse.module.scss";
import { Image } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import { Tooltip } from "@material-ui/core";
import pluralize from "pluralize";
import { useHistory } from "react-router-dom";
import { urls } from "../../constants";
import { PropertyPreviewDTO } from "../../api";

interface ListingHouseProps {
  house: PropertyPreviewDTO;
}

export function ListingHouse(props: ListingHouseProps) {
  const history = useHistory();
  const house = props.house;
  const houseAddress = house.address;
  const houseStreetNumber = `${houseAddress.street} ${houseAddress.number}`;
  const baths = pluralize("baño", house.fullBaths);
  return (
    <Grid
      container
      className={styles.propertyInformation}
      onClick={() => history.push(urls.viewProperty.byId(house.id))}
    >
      <Grid xs={6}>
        <Image
          className={styles.propertiesImages}
          src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
          rounded
        />
      </Grid>
      <Grid xs={6}>
        <Tooltip title={house.title}>
          <p className={styles.propertyTitle}>{house.title}</p>
        </Tooltip>
        <p className={styles.propertyPriceCondition}>
          ${house.price.toLocaleString()} &nbsp;|&nbsp; En{" "}
          {house.condition === "SALE" ? "Venta" : "Alquiler"}
        </p>
        <p className={styles.propertySpecifications}>
          {house.squareFoot} m² &nbsp;&nbsp;|&nbsp;&nbsp; {house.rooms} hab.
          &nbsp;&nbsp;|&nbsp;&nbsp; {house.fullBaths} {baths}
        </p>
        <Tooltip title={houseStreetNumber}>
          <p className={styles.propertyStreetNumber}>{houseStreetNumber}</p>
        </Tooltip>
        <p className={styles.propertyTownCity}>
          {houseAddress.town.name}, {houseAddress.town.city.name}
        </p>
      </Grid>
    </Grid>
  );
}
