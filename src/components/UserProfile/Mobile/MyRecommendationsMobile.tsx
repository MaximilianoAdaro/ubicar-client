import styles from "./UserProfileMobile.module.scss";
import React from "react";
import { Button, Grid } from "@material-ui/core";
import { useGetFavoritePropertiesUsingGET } from "../../../api";
import { Link } from "react-router-dom";
import { urls } from "../../../constants";
import { RiArrowLeftSLine } from "react-icons/all";
import { List, ListItem } from "@mui/material";
import { PropretyCardMyFavoritesMobile } from "./PropertyCardMyFavoritesMobile";

export function MyRecommendationsMobile() {
  const data = useGetFavoritePropertiesUsingGET();
  return (
    <Grid className={styles.user_profile_container}>
      <Grid className={styles.user_profile_title}>
        <h3>Recomendaciones</h3>
      </Grid>
      <Grid className={styles.user_profile_go_back}>
        <Link to={urls.userProfile.path}>
          <Button
            style={{
              textTransform: "none",
              width: "100%",
              justifyContent: "left",
            }}
            size={"small"}
          >
            <RiArrowLeftSLine
              style={{ marginBottom: "2px", marginRight: "0.5em" }}
            />
            Volver
          </Button>
        </Link>
      </Grid>
      <Grid>
        <Grid>
          <span className={styles.user_profile_tab_description}>
            Aqui puedes ver propiedades recomendadas en base a tus últimas
            busquedas en nuestra aplicación.
          </span>
        </Grid>
        <Grid className={styles.properties}>
          <div className={styles.propertyList}>
            {data.status === "success" && data?.data.length > 0 ? (
              <div>
                <List>
                  {data?.data
                    .filter((casa) => casa.step == 7)
                    .map((casa) => (
                      <ListItem style={{ width: "20em" }}>
                        <PropretyCardMyFavoritesMobile
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
                Empieza likeando propiedades para poder recomendarte
                propiedades.
              </h5>
            )}
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
