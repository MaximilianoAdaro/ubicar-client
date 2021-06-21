import { PropertyPreviewDTO } from "../../api/generated/endpoints.schemas";
import { Grid, Tooltip } from "@material-ui/core";
import { Image } from "react-bootstrap";
import styles from "./UserProfile.module.scss";
import { useHistory } from "react-router-dom";
import pluralize from "pluralize";
import { urls } from "../../constants";

interface ListingHouseProps {
  house: PropertyPreviewDTO;
}

export function PropertyList(props: ListingHouseProps) {
  const house = props.house;
  const history = useHistory();
  const houseAddress = house.address;
  const houseStreetNumber = `${houseAddress.street} ${houseAddress.number}`;
  const baths = pluralize("baño", house.fullBaths);
  console.log(house);
  return (
    <Grid className={styles.myPropertyOuterDiv}>
      <Grid
        container
        className={styles.container}
        onClick={() => history.push(urls.viewProperty.byId(house.id))}
      >
        <Grid xs={4} xl={3}>
          <Image
            className={styles.myPropertiesImage}
            src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
            rounded
          />
        </Grid>
        <Grid xs={8} xl={9}>
          <p className={styles.myPropertyTitle}>
            {house.title} &nbsp;|&nbsp; {house.type}
          </p>
          <p className={styles.myPropertyPriceCondition}>
            En {house.condition == "SALE" ? "Venta" : "Alquiler"} &nbsp;|&nbsp;
            ${house.price.toLocaleString()}
          </p>
          <p className={styles.myPropertySpecifications}>
            {house.squareFoot} m² &nbsp; totales &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
            {house.coveredSquareFoot} m² &nbsp; cubiertos
            &nbsp;&nbsp;|&nbsp;&nbsp; {house.rooms} habitaciones
            &nbsp;&nbsp;|&nbsp;&nbsp; {house.fullBaths} {baths}{" "}
            &nbsp;&nbsp;|&nbsp;&nbsp; {house.toilets} toilets
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
