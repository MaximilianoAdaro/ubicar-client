import React from "react";
import Grid from "@material-ui/core/Grid";
import { ListingHouse } from "../../components/listingHouse";
import styles from "./ListingPage.module.scss";
import { ListingFilters } from "../../components/listingFilters";
import { useFetchProperties } from "../../api/listingProperties/houses";
import { useAppSelector } from "../../store";
import { selectView, selectZoom } from "../../store/slices/map/mapSlice";
import { MapComponent } from "../../components/Map/map";
import { NavBar } from "../../components/navbar/NavBar";
import { Footer } from "../../components/footer/Footer";

export function ListingPage() {
  const data = useFetchProperties();
  const zoom = useAppSelector(selectZoom);
  const view = useAppSelector(selectView);

  return (
    <div>
      <NavBar />
      <ListingFilters />
      <Grid container className={styles.mapAndProperties}>
        <Grid item xl={9} sm={8} className={styles.map}>
          <MapComponent zoom={zoom} view={view} />
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
      <Footer />
    </div>
  );
}
