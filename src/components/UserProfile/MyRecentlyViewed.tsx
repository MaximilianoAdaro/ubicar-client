import styles from "./UserProfile.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";
import { useGetAllRecentlyViewedPropertiesUsingGET } from "../../api";
import { ListItem, List } from "@material-ui/core";
import { PropretyCardMyFavorites } from "./PropertyCardMyFavorites";

export function MyRecentlyViewed() {
  const data = useGetAllRecentlyViewedPropertiesUsingGET();
  return (
    <div className={styles.personalDataMainDiv}>
      <Grid>
        <p>Aqui puedes ver las últimas 50 propiedades que viste</p>
      </Grid>
      <Grid className={styles.properties}>
        <div className={styles.propertyList}>
          {data.status === "success" && data?.data.length > 0 ? (
            <div>
              <h3>Propiedades recientemente vistas</h3>
              <List
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 0,
                  overflow: "auto",
                  margin: "0",
                }}
              >
                {data?.data
                  .filter((casa) => casa.step == 7)
                  .map((casa) => (
                    <ListItem style={{ width: "20em" }}>
                      <PropretyCardMyFavorites
                        key={casa.id}
                        house={casa}
                        from={"properties"}
                        state={""}
                      />
                    </ListItem>
                  ))}
              </List>
            </div>
          ) : (
            <h5 style={{ color: "gray" }}>No viste ninguna propiedad.</h5>
          )}
        </div>
      </Grid>
    </div>
  );
}
