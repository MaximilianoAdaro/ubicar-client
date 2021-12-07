import styles from "./HomePageMobile.module.scss";
import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import { useGetHomePagePropertiesUsingGET } from "../../../api";
import { urls } from "../../../constants";
import { useHistory } from "react-router-dom";
import { MostLikedMobile } from "./MostLikedMobile";
import { HouseCardMobile } from "../../newListingHouse";
import { Button } from "@mui/material";
import { CgProfile, RiArrowRightSLine } from "react-icons/all";

const StyledButton = withStyles({
  root: {
    justifyContent: "left",
    textTransform: "none",
    marginBottom: "0.5em",
  },
})(Button);

export function RecentlyViewedMobile() {
  const { data: properties } = useGetHomePagePropertiesUsingGET();
  const history = useHistory();

  return (
    <div>
      {properties && properties?.length > 0 ? (
        <div className={styles.personalDataMainDiv}>
          <Grid className={styles.properties}>
            <div className={styles.propertyList}>
              <h4 className={styles.title}>Propiedades vistas recientemente</h4>
              <div className={styles.propertyCard}>
                {properties?.slice(0, 4).map((casa) => (
                  <div
                    onClick={() =>
                      history.push(urls.viewProperty.byId(casa.id))
                    }
                  >
                    <HouseCardMobile
                      key={casa.id}
                      house={casa}
                      isLarge={true}
                      // from={"properties"}
                      // state={""}
                    />
                  </div>
                ))}
                {properties && (
                  <Grid>
                    <Button
                      style={{
                        justifyContent: "left",
                        textTransform: "none",
                        marginBottom: "0.5em",
                        paddingTop: "0",
                      }}
                      onClick={() =>
                        history.push(urls.userProfile.recentlyViewed)
                      }
                    >
                      Ver más
                      <RiArrowRightSLine style={{ marginTop: "0.2em" }} />
                    </Button>
                  </Grid>
                )}
              </div>
            </div>
            <div className={styles.propertyList}>
              <h4 className={styles.title}>Propiedades recomendadas</h4>
              <div className={styles.propertyCard}>
                {properties?.slice(0, 4).map((casa) => (
                  <div
                    onClick={() =>
                      history.push(urls.viewProperty.byId(casa.id))
                    }
                  >
                    <HouseCardMobile
                      key={casa.id}
                      house={casa}
                      isLarge={true}
                      // from={"properties"}
                      // state={""}
                    />
                  </div>
                ))}
                {properties && (
                  <Grid>
                    <Button
                      style={{
                        justifyContent: "left",
                        textTransform: "none",
                        marginBottom: "0.5em",
                        paddingTop: "0",
                      }}
                      onClick={() =>
                        history.push(urls.userProfile.recommendations)
                      }
                    >
                      Ver más
                      <RiArrowRightSLine style={{ marginTop: "0.2em" }} />
                    </Button>
                  </Grid>
                )}
              </div>
            </div>
          </Grid>
        </div>
      ) : (
        <MostLikedMobile />
      )}
    </div>
  );
}
