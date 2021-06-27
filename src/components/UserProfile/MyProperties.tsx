import styles from "./UserProfile.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";
import { PropertyList } from "./PropertyList";
import { useGetPropertiesUsingGET } from "../../api";

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
            <PropertyList key={casa.id} house={casa} from={"properties"} />
          ))}
      </Grid>
    </div>
  );
}
