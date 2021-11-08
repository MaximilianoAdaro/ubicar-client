import styles from "./UserProfileMobile.module.scss";

import React from "react";
import { Button, Grid } from "@material-ui/core";
import {
  useGetAllRecentlyViewedPropertiesUsingGET,
  useGetOpportunitiesUsingGET,
} from "../../../api";
import { Link } from "react-router-dom";
import { urls } from "../../../constants";
import { RiArrowLeftSLine } from "react-icons/all";
import { List, ListItem } from "@mui/material";
import { PropretyCardMyFavoritesMobile } from "./PropertyCardMyFavoritesMobile";

export function MyOpportunitiesMobile() {
  const data = useGetOpportunitiesUsingGET();
  console.log(data);
  return (
    <Grid className={styles.user_profile_container}>
      <Grid className={styles.user_profile_title}>
        <h3>Oportunidades</h3>
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
          <p className={styles.user_profile_tab_description}>
            Aqui puedes ver las oportunidades de inversión que se encuentran en
            la página
          </p>
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
              <p
                style={{
                  color: "gray",
                  marginTop: "1.5em",
                  textAlign: "center",
                }}
              >
                No hay oportunidades publicadas en el momento
              </p>
            )}
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
