import { PropertyPreviewDTO } from "../../api/generated/endpoints.schemas";
import { Grid, Tooltip } from "@material-ui/core";
import { Image } from "react-bootstrap";
import styles from "./UserProfile.module.scss";
import { useHistory } from "react-router-dom";
import pluralize from "pluralize";

interface ListingHouseProps {
  house: PropertyPreviewDTO;
}

export function PropertyList(props: ListingHouseProps) {
  const house = props.house;
  const houseAddress = house.address;
  const houseStreetNumber = `${houseAddress.street} ${houseAddress.number}`;
  const baths = pluralize("baño", house.fullBaths);
  return (
    <Grid className={styles.myPropertyOuterDiv}>
      <Grid container className={styles.container}>
        <Grid xs={4} xl={3}>
          <Image
            className={styles.myPropertiesImage}
            src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
            rounded
          />
        </Grid>
        <Grid xs={8} xl={9}>
          <p className={styles.myPropertyTitle}>{house.title}</p>
          <p className={styles.myPropertyPriceCondition}>
            ${house.price.toLocaleString()} &nbsp;|&nbsp; En venta
          </p>
          <p className={styles.myPropertySpecifications}>
            {house.squareFoot} m² &nbsp;&nbsp;|&nbsp;&nbsp; {house.rooms} hab.
            &nbsp;&nbsp;|&nbsp;&nbsp; {house.fullBaths} {baths}
          </p>
          <p className={styles.myPropertyStreetNumber}>{houseStreetNumber}</p>
          <p className={styles.myPropertyTownCity}>
            {houseAddress.town.name}, {houseAddress.town.city.name}
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
}
