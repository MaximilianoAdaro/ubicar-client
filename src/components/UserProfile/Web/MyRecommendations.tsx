import styles from "./UserProfile.module.scss";
import React from "react";
import { Grid, List, ListItem } from "@material-ui/core";
import { useGetAllRecentlyViewedPropertiesUsingGET } from "../../../api";
import { PropretyCardMyFavorites } from "./PropertyCardMyFavorites";

export function MyRecommendations() {
  const data = useGetAllRecentlyViewedPropertiesUsingGET();
  return (
    <div className={styles.personalDataMainDiv}>
      <Grid>
        <p>
          Aqui puedes ver propiedades recomendadas en base a tus últimas
          busquedas en nuestra aplicación.
        </p>
      </Grid>
      <Grid>
        <Grid>
          {data.status === "success" && data?.data.length > 0 ? (
            <div>
              <h3>Propiedades recomendadas</h3>
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
                  .slice(0, 5)
                  .filter((casa) => casa.step == 7)
                  .map((casa) => (
                    <ListItem
                      className={styles.user_profile_favorites_recently_list}
                    >
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
            <h5 style={{ color: "gray" }}>
              No tenemos recomendaciones para usted.
            </h5>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
