import styles from "./UserProfile.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";
import { ListingHouse } from "../listingHouse";
import { useGetPropertiesUsingGET } from "../../api/generated/property-public-controller/property-public-controller";
import { PropertyList } from "./PropertyList";

export function MyFavorites() {
  const data = useGetPropertiesUsingGET({
    page: 0,
  });
  return (
    <div>
      <Grid className={styles.personalDataMainDiv}>
        <h1>Mis Favoritos</h1>
        <p>Aqui puedes ver las propiedades que mas te gustaron.</p>
      </Grid>
      <Grid className={styles.properties}>
        <div className={styles.propertyList}>
          {data.status === "success" &&
            data?.data.content?.map((casa: any) => (
              <PropertyList key={casa.id} house={casa} />
            ))}
        </div>
      </Grid>
    </div>
  );
}
