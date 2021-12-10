import styles from "./UserProfileMobile.module.scss";
import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import {
  useGetAllRecentlyViewedPropertiesUsingGET,
  useGetRecommendations,
} from "../../../api";
import { Link } from "react-router-dom";
import { urls } from "../../../constants";
import { RiArrowLeftSLine } from "react-icons/all";
import { RecommendationList } from "./RecommendationList";

export function MyRecommendationsMobile() {
  const { data: properties } = useGetRecommendations();
  const [component, setComponent] = useState(1);

  function changeTo(componentNumber: number) {
    setComponent(componentNumber);
  }
  if (!properties) return <h1>Loading...</h1>;
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
          <Grid container>
            {properties[0] && (
              <Grid xs>
                <Button onClick={() => changeTo(1)} fullWidth>
                  1
                </Button>
              </Grid>
            )}
            {properties[1] && (
              <Grid xs>
                <Button onClick={() => changeTo(2)} fullWidth>
                  2
                </Button>
              </Grid>
            )}
            {properties[2] && (
              <Grid xs>
                <Button onClick={() => changeTo(3)} fullWidth>
                  3
                </Button>
              </Grid>
            )}
          </Grid>
          <Grid>
            {component === 1 && properties[0] && (
              <RecommendationList listNumber={0} />
            )}
            {component === 2 && properties[1] && (
              <RecommendationList listNumber={1} />
            )}
            {component === 3 && properties[2] && (
              <RecommendationList listNumber={2} />
            )}
            {properties.length === 0 && (
              <h5 style={{ marginTop: "1em" }}>
                No tenemos recomendaciones para vos
              </h5>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
