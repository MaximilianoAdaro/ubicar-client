import React from "react";
import Grid from "@material-ui/core/Grid";
import { ListingHouse } from "../../components/listingHouse";
import styles from "./ListingPage.module.scss";
import { ListingFilters } from "../../components/listingFilters";
import {useFetchProperties} from "../../api/listingProperties/houses";

export function ListingPage() {
  const data = useFetchProperties();

  return (
    <div>
      <ListingFilters />
      <Grid container className={styles.mapAndProperties}>
        <Grid item xl={9} sm={8}>
          <h1>Mapa</h1>
        </Grid>
        <Grid item xl={3} sm={4} className={styles.propertyList}>
          {data.status === "error" && (
            <h1>There was an error retrieving the properties</h1>
          )}
          {data.status === "success" &&
            data.data.content.map((casa: any) => (
              <ListingHouse key={casa.id} house={casa} />
            ))}
        </Grid>
      </Grid>
    </div>
  );
}
