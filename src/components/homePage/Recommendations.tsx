import styles from "./HomePage.module.scss";
import React from "react";
import { Grid, List, ListItem } from "@material-ui/core";
import { PropretyCardMyFavorites } from "../UserProfile/Web/PropertyCardMyFavorites";
import { useGetRecommendations } from "../../api";
import { urls } from "../../constants";
import { useHistory } from "react-router-dom";
import { MostLiked } from "./MostLiked";

type RecommendationsProps = {
  recommendationNumber: number;
};

export function Recommendations({
  recommendationNumber,
}: RecommendationsProps) {
  const { data: properties } = useGetRecommendations();
  const history = useHistory();

  if (!properties) return <h1>Loading...</h1>;

  return (
    <div>
      {properties[recommendationNumber] &&
      properties[recommendationNumber].properties.length > 0 ? (
        <div className={styles.personalDataMainDiv}>
          <Grid className={styles.properties}>
            <div className={styles.propertyList}>
              <div>
                <h1 style={{ margin: "0px" }}>
                  Como te gusto{" "}
                  <a
                    href={urls.viewProperty.byId(
                      properties[recommendationNumber].liked.id
                    )}
                  >
                    esta propiedad
                  </a>{" "}
                  te recomendamos:
                </h1>
              </div>
              <List
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 0,
                  overflow: "auto",
                  margin: "0",
                }}
              >
                {properties[recommendationNumber]?.properties.map(
                  (casa: any) => (
                    <ListItem
                      style={{ width: "20em", marginRight: "2em" }}
                      onClick={() =>
                        history.push(urls.viewProperty.byId(casa.id))
                      }
                    >
                      <PropretyCardMyFavorites
                        key={casa.id}
                        house={casa}
                        from={"properties"}
                        state={""}
                      />
                    </ListItem>
                  )
                )}
              </List>
            </div>
          </Grid>
        </div>
      ) : (
        <MostLiked />
      )}
    </div>
  );
}
