import styles from "./UserProfile.module.scss";
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { ListingHouse } from "../listingHouse";
import { useFetchProperties } from "../../api/property";

export function MyFavorites() {
  const data = useFetchProperties();
  return (
    <div>
      <Grid>
        <h1>Mis Favoritos</h1>
        <p>Aqui puedes ver las propiedades que mas te gustaron.</p>
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
