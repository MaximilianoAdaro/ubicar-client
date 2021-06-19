import styles from "./UserProfile.module.scss";
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { ListingHouse } from "../listingHouse";
import { useGetPropertiesUsingGET } from "../../api/generated/property-controller/property-controller";

export function MyProperties() {
  const data = useGetPropertiesUsingGET({
    page: 0,
  });
  return (
    <div>
      <Grid className={styles.personalDataMainDiv}>
        <h1>Mis Propiedades</h1>
        <p>Aqui puedes ver las propiedades que publicaste.</p>
      </Grid>
      <Grid className={styles.properties}>
        {data.status === "success" &&
          data?.data.content?.map((casa: any) => (
            <ListingHouse key={casa.id} house={casa} />
          ))}
      </Grid>
    </div>
  );
}
