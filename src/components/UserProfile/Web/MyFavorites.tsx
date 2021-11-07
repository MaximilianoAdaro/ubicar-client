import styles from "./UserProfile.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";
import { useGetFavoritePropertiesUsingGET } from "../../../api";
import { ListItem, List } from "@material-ui/core";
import { PropretyCardMyFavorites } from "./PropertyCardMyFavorites";

export function MyFavorites() {
  const data = useGetFavoritePropertiesUsingGET();
  return (
    <div className={styles.personalDataMainDiv}>
      <Grid>
        <p>Aqui puedes ver las propiedades que más te gustaron.</p>
      </Grid>
      <Grid>
        <Grid>
          {data.status === "success" && data?.data.length > 0 ? (
            <div>
              <h3>Propiedades en favoritos</h3>
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
              No tienes propiedades en favoritos.
            </h5>
          )}
        </Grid>
      </Grid>
      {/*<Grid className={styles.properties}>*/}
      {/*  <div className={styles.propertyList}>*/}
      {/*    {data.status === "success" && data?.data.length > 0 ? (*/}
      {/*      <div>*/}
      {/*        <h3>Propiedades en favoritos</h3>*/}
      {/*        <List*/}
      {/*          style={{*/}
      {/*            display: "flex",*/}
      {/*            flexDirection: "row",*/}
      {/*            padding: 0,*/}
      {/*            overflow: "auto",*/}
      {/*            margin: "0",*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          {data?.data*/}
      {/*            .filter((casa) => casa.step == 7)*/}
      {/*            .map((casa) => (*/}
      {/*              <ListItem style={{ width: "20em" }}>*/}
      {/*                <PropretyCardMyFavorites*/}
      {/*                  key={casa.id}*/}
      {/*                  house={casa}*/}
      {/*                  from={"properties"}*/}
      {/*                  state={""}*/}
      {/*                />*/}
      {/*              </ListItem>*/}
      {/*            ))}*/}
      {/*        </List>*/}
      {/*      </div>*/}
      {/*    ) : (*/}
      {/*      <h5 style={{ color: "gray" }}>*/}
      {/*        No tienes propiedades en favoritos.*/}
      {/*      </h5>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</Grid>*/}
    </div>
  );
}
