import styles from "./HomePage.module.scss";
import React from "react";
import { Grid, List, ListItem } from "@material-ui/core";
import { PropretyCardMyFavorites } from "../UserProfile/Web/PropertyCardMyFavorites";
import { useGetHomePagePropertiesUsingGET } from "../../api";
import { urls } from "../../constants";
import { useHistory } from "react-router-dom";
import { MostLiked } from "./MostLiked";

type RecentlyViewedProp = {
  title: string;
  numberOfHouses: number;
};

export function RecentlyViewed({ title, numberOfHouses }: RecentlyViewedProp) {
  const { data: properties } = useGetHomePagePropertiesUsingGET();
  const history = useHistory();

  return (
    <div>
      {properties && properties?.length > 0 ? (
        <div className={styles.personalDataMainDiv}>
          <Grid className={styles.properties}>
            <div className={styles.propertyList}>
              <div>
                <h1 style={{ margin: "0px" }}>{title}</h1>
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
                {properties?.slice(0, numberOfHouses).map((casa) => (
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
                ))}
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
