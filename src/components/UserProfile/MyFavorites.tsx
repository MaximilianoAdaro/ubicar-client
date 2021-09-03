import styles from "./UserProfile.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";
import { PropertyList } from "./PropertyList";
import { useGetFavoritePropertiesUsingGET } from "../../api";

export function MyFavorites() {
  const data = useGetFavoritePropertiesUsingGET();
  return (
    <div>
      <Grid className={styles.personalDataMainDiv}>
        <h1>Mis Favoritos</h1>
        <p>Aqui puedes ver las propiedades que más te gustaron.</p>
      </Grid>
      <Grid className={styles.properties}>
        <div className={styles.propertyList}>
          {data.status === "success" && data?.data.length > 0 ? (
            <div>
              <h3>Propiedades publicadas</h3>
              {data?.data
                .filter((casa) => casa.step < 7)
                .map((casa) => (
                  <PropertyList
                    key={casa.id}
                    house={casa}
                    from={"properties"}
                    state={""}
                  />
                ))}
            </div>
          ) : (
            <h3>No tienes propiedades en favoritos.</h3>
          )}
        </div>
      </Grid>
    </div>
  );
}
