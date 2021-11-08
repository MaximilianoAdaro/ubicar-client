import styles from "./UserProfile.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";
import { useGetMyPropertiesUsingGET } from "../../../api";
import { PropertyCardMyProperties } from "./PropertyCardMyProperties";

export function MyProperties() {
  const data = useGetMyPropertiesUsingGET();
  return (
    <div className={styles.personalDataMainDiv}>
      <Grid>
        <p>
          Aqui puedes ver las propiedades que publicaste y las que todavia no
          terminaste de publicar.
        </p>
      </Grid>
      <Grid container>
        <Grid className={styles.properties} xs={6}>
          {data.status === "success" &&
          data?.data.filter((casa) => casa.step === 7).length > 0 ? (
            <div>
              <h3>Propiedades publicadas</h3>
              <Grid className={styles.published_property_list}>
                {data?.data
                  .filter((casa) => casa.step === 7)
                  .map((casa) => (
                    <PropertyCardMyProperties
                      clickable={true}
                      key={casa.id}
                      house={casa}
                      from={"properties"}
                      state={""}
                    />
                  ))}
              </Grid>
            </div>
          ) : (
            <h3
              style={{ color: "gray", textAlign: "center", marginTop: "2em" }}
            >
              No tienes propiedades publicadas.
            </h3>
          )}
        </Grid>

        <Grid className={styles.properties} xs={6}>
          {data.status === "success" &&
          data?.data.filter((casa) => casa.step < 7).length > 0 ? (
            <div>
              <h3>Propiedades sin publicar</h3>
              <Grid className={styles.published_property_list}>
                {data?.data
                  .filter((casa) => casa.step < 7)
                  .map((casa) => (
                    <Grid>
                      <PropertyCardMyProperties
                        clickable={false}
                        key={casa.id}
                        house={casa}
                        from={"properties"}
                        state={"notfinished"}
                      />
                    </Grid>
                  ))}
              </Grid>
            </div>
          ) : (
            <div />
          )}
          <br />
          <br />
          <br />
        </Grid>
      </Grid>
    </div>
  );
}
