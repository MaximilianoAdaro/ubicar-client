import styles from "./UserProfileMobile.module.scss";
import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { useGetAllRecentlyViewedPropertiesUsingGET } from "../../../api";
import { Link } from "react-router-dom";
import { urls } from "../../../constants";
import { RiArrowLeftSLine } from "react-icons/all";
import { RecommendationList } from "./RecommendationList";

export function MyRecommendationsMobile() {
  const data = useGetAllRecentlyViewedPropertiesUsingGET();
  const [component, setComponent] = useState(1);

  function changeTo(componentNumber: number) {
    setComponent(componentNumber);
  }

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
            <Grid xs>
              <Button onClick={() => changeTo(1)} fullWidth>
                1
              </Button>
            </Grid>
            <Grid xs>
              <Button onClick={() => changeTo(2)} fullWidth>
                2
              </Button>
            </Grid>
            <Grid xs>
              <Button onClick={() => changeTo(3)} fullWidth>
                3
              </Button>
            </Grid>
          </Grid>
          <Grid>
            {component === 1 && (
              <RecommendationList data={data} listNumber={1} />
            )}
            {component === 2 && (
              <RecommendationList data={data} listNumber={2} />
            )}
            {component === 3 && (
              <RecommendationList data={data} listNumber={3} />
            )}
          </Grid>
          {/*<div className={styles.propertyList}>*/}
          {/*  {data.status === "success" && data?.data.length > 0 ? (*/}
          {/*    <div>*/}
          {/*      <List>*/}
          {/*        {data?.data*/}
          {/*          .slice(0, 5)*/}
          {/*          .filter((casa) => casa.step == 7)*/}
          {/*          .map((casa) => (*/}
          {/*            <ListItem style={{ width: "20em" }}>*/}
          {/*              <PropretyCardMyFavoritesMobile*/}
          {/*                key={casa.id}*/}
          {/*                house={casa}*/}
          {/*                from={"properties"}*/}
          {/*                state={""}*/}
          {/*              />*/}
          {/*            </ListItem>*/}
          {/*          ))}*/}
          {/*      </List>*/}
          {/*    </div>*/}
          {/*  ) : (*/}
          {/*    <h5 style={{ color: "gray" }}>*/}
          {/*      Empieza likeando propiedades para poder recomendarte*/}
          {/*      propiedades.*/}
          {/*    </h5>*/}
          {/*  )}*/}
          {/*</div>*/}
        </Grid>
      </Grid>
    </Grid>
  );
}
