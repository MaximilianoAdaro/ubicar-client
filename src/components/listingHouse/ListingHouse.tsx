import styles from "./ListingHouse.module.scss";
import { Image } from "react-bootstrap";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";

export function ListingHouse(props: any) {
  const house = props.house;
  const houseAddress = house.address;
  const houseStreetNumber = `${houseAddress.street} ${houseAddress.number}`;
  const pluralize = require("pluralize");
  const baths = pluralize("baño", house.fullBaths);
  return (
    <Grid container className={styles.propertyInformation}>
      <Grid xs={6}>
        <Image
          className={styles.propertiesImages}
          src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
          rounded
        />
      </Grid>
      <Grid xs={6}>
        <Tooltip title={house.title}>
          <Link to={`/editProp/${house.id}`}>
            <p className={styles.propertyTitle}>{house.title}</p>
          </Link>
        </Tooltip>
        <p className={styles.propertyPriceCondition}>
          ${house.price.toLocaleString()} &nbsp;|&nbsp; En venta
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
