import styles from "./ListingHouse.module.scss";
import { Image } from "react-bootstrap";
import React from "react";
import Grid from "@material-ui/core/Grid";

export function ListingHouse(props: any) {
  // const toLowerCaseExceptFirst = (data: string) => {
  //   return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
  // };
  const house = props.house;
  const houseAddress = house.address;
  // const pluralize = require("pluralize");
  // const baths = pluralize("baño", house.fullBaths);
  return (
    <div>
      <Grid container className={styles.propertyList}>
        <Grid container className={styles.propertyInformation}>
          <Grid xs={6}>
            <Image
              className={styles.propertiesImages}
              src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
              rounded
            />
          </Grid>
          <Grid container xs={6}>
            <Grid className={styles.houseTitle}>
              <Grid>{house.title}</Grid>
            </Grid>
            <Grid container className={styles.housePriceCondition}>
              <Grid>
                <Grid>
                  ${house.price.toLocaleString()} | En{" "}
                  {house.condition.toLowerCase()}
                </Grid>
              </Grid>
              {/*<Grid>*/}
              {/*  <Grid>*/}
              {/*    {house.type} in {house.condition.toLowerCase()}*/}
              {/*  </Grid>*/}
              {/*</Grid>*/}
            </Grid>
            <Grid container className={styles.houseInformation}>
              <Grid>
                {house.squareFoot} m² |&nbsp; {house.rooms} hab. |&nbsp;{" "}
                {house.fullBaths} baños
              </Grid>
              {/*<Grid>{house.rooms} hab. |</Grid>*/}
              {/*<Grid>{house.fullBaths} baños</Grid>*/}
            </Grid>
            <Grid>
              <Grid className={styles.propertyStreet}>
                {houseAddress.street} {houseAddress.number}
              </Grid>
              {/*<Grid className={styles.propertyStreet}>*/}
              {/*  {house.street} {house.number}*/}
              {/*</Grid>*/}
              <Grid className={styles.propertyTownCity}>
                {houseAddress.town.name}, {houseAddress.town.city.name}
              </Grid>
              {/*<Grid className={styles.propertyTownCity}>*/}
              {/*  {house.town}, {house.city}*/}
              {/*</Grid>*/}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
    // <Row className={styles.propertyInformation}>
    //   <Col className={styles.propertyImageCol}>

    //   </Col>
    //   <Col className={styles.propertyTechnicalInformation}>
    //     <Row className={styles.propertyCharacteristicsTitle}>{house.title}</Row>
    //     <Row className={styles.propertyCharacteristics}>
    //       <p>$ {house.price.toLocaleString()} </p>
    //       <p>
    //         {toLowerCaseExceptFirst(house.type)} in{" "}
    //         {toLowerCaseExceptFirst(house.condition)}
    //       </p>
    //     </Row>
    //     <Row className={styles.propertyCharacteristics}>
    //       <p>{house.squareFoot} m²</p>
    //       <p>{house.rooms} habs</p>
    //       <p>{house.baths} baths</p>
    //     </Row>
    //     <Row className={styles.propertyCharacteristicsAddress}>{address}</Row>
    //   </Col>
    // </Row>
  );
}
