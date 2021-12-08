import styles from "./UserProfile.module.scss";
import React from "react";
import { Grid, List, ListItem, Popover, Typography } from "@material-ui/core";
import { useGetRecommendations } from "../../../api";
import { PropretyCardMyFavorites } from "./PropertyCardMyFavorites";
import { urls } from "../../../constants";
import { Button } from "@mui/material";

export function MyRecommendations() {
  const { data } = useGetRecommendations();
  const [anchorFilter, setAnchorFilter] =
    React.useState<HTMLButtonElement | null>(null);
  if (!data) return <h1>Loading...</h1>;

  const openFilterPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorFilter(event.currentTarget);
  };

  console.log(Object.entries(data[0].filter));
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
              <h3>
                Como guardaste
                <Button
                  onClick={openFilterPopover}
                  style={{
                    textTransform: "none",
                    paddingBottom: "0",
                    color: "#007bff",
                  }}
                >
                  <h3>estos filtros</h3>
                </Button>{" "}
                y te gusto{" "}
                <a href={urls.viewProperty.byId(data[0].liked.id)}>
                  {" "}
                  esta propiedad
                </a>{" "}
                te recomendamos:
              </h3>
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
          {data[1].properties.length > 0 ? (
            <div>
              <h3>
                Como te gusto{" "}
                <a href={urls.viewProperty.byId(data[1].liked.id)}>
                  {" "}
                  esta propiedad
                </a>{" "}
                te recomendamos:
              </h3>
              <List
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 0,
                  overflow: "auto",
                  margin: "0",
                }}
              >
                {data[1]?.properties
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
          {data[2].properties.length > 0 ? (
            <div>
              <h3>
                Como te gusto{" "}
                <a href={urls.viewProperty.byId(data[2].liked.id)}>
                  {" "}
                  esta propiedad
                </a>{" "}
                te recomendamos:
              </h3>
              <List
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 0,
                  overflow: "auto",
                  margin: "0",
                }}
              >
                {data[2]?.properties
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
      <Popover
        style={{ marginTop: "5px", borderRadius: "5px" }}
        open={Boolean(anchorFilter)}
        anchorEl={anchorFilter}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() => setAnchorFilter(null)}
      >
        <List style={{ padding: "1em" }}>
          {Object.entries(data[0].filter).map(([key, value]) => (
            <Typography>{value !== null && `${key} : ${value}`}</Typography>
          ))}
        </List>
      </Popover>
    </div>
  );
}
