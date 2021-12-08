import styles from "./UserProfile.module.scss";
import React from "react";
import { Grid, List, ListItem } from "@material-ui/core";
import {
  useGetAllRecentlyViewedPropertiesUsingGET,
  useGetRecommendations,
} from "../../../api";
import { PropretyCardMyFavorites } from "./PropertyCardMyFavorites";

export function MyRecommendations() {
  const { data } = useGetRecommendations();
  console.log(data);
  if (!data) return <h1>Loading...</h1>;

  return (
    <div className={styles.recommendation_div}>
      <Grid>
        <p>
          Aqui puedes ver propiedades recomendadas en base a tus últimas
          busquedas en nuestra aplicación.
        </p>
      </Grid>
      <Grid>
        <Grid className={styles.recommendation_first_list}>
          {data[0].properties.length > 0 ? (
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
                {data[0]?.properties
                  .filter((casa: any) => casa.step == 7)
                  .map((casa: any) => (
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
        <Grid className={styles.recommendation_second_list}>
          {data[0].properties.length > 0 ? (
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
                {data[0]?.properties
                  .filter((casa: any) => casa.step == 7)
                  .map((casa: any) => (
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
        <Grid className={styles.recommendation_first_list}>
          {data[0].properties.length > 0 ? (
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
                {data[0]?.properties
                  .filter((casa: any) => casa.step == 7)
                  .map((casa: any) => (
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
