import styles from "./UserProfile.module.scss";
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useFetchProperties } from "../../api/property";
import { ListingHouse } from "../listingHouse";

export function MyProperties() {
  const data = useFetchProperties();
  return (
    <div>
      <Grid>
        <h1>Mis Propiedades</h1>
        <p>Aqui puedes ver las propiedades que publicaste.</p>
      </Grid>
      <Grid>
        {data.status === "success" &&
          data?.data.content?.map((casa: any) => (
            <ListingHouse key={casa.id} house={casa} />
          ))}
      </Grid>
    </div>
  );
}
