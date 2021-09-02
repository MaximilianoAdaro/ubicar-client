import styles from "./UserProfile.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";
import { PropertyList } from "./PropertyList";
import { useGetMyPropertiesUsingGET } from "../../api";
import { Loading } from "../common/loading/Loading";

export function MyProperties() {
  const data = useGetMyPropertiesUsingGET();
  return (
    <div>
      <Grid className={styles.personalDataMainDiv}>
        <h1>Mis Propiedades</h1>
        <p>
          Aqui puedes ver las propiedades que publicaste y las que todavia no
          terminaste de publicar.
        </p>
      </Grid>
      <Grid className={styles.properties}>
        <h3>Propiedades Publicadas</h3>
        {data.status === "success" &&
          data?.data
            .filter((casa) => casa.step === 7)
            .map((casa) => (
              <PropertyList key={casa.id} house={casa} from={"properties"} />
            ))}
      </Grid>

      <Grid className={styles.properties}>
        {/*<h3>Propiedades sin publicar</h3>*/}
        {data.status === "success" &&
        data?.data.filter((casa) => casa.step < 7).length > 0 ? (
          <div>
            <h3>Propiedades sin publicar</h3>
            {data?.data
              .filter((casa) => casa.step < 7)
              .map((casa) => (
                <PropertyList key={casa.id} house={casa} from={"properties"} />
              ))}
          </div>
        ) : (
          <div></div>
        )}
        <br />
        <br />
        <br />
      </Grid>
    </div>
  );
}
