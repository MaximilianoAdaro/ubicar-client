import styles from "./HomePage.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";
import { ListItem, List } from "@material-ui/core";
import { PropretyCardMyFavorites } from "../UserProfile/Web/PropertyCardMyFavorites";
import { useGetMostLikedPropertiesUsingGET } from "../../api";
import { urls } from "../../constants";
import { useHistory } from "react-router-dom";

export function MostLiked() {
  const { data: properties } = useGetMostLikedPropertiesUsingGET();
  const history = useHistory();

  return (
    <div className={styles.personalDataMainDiv}>
      <Grid className={styles.properties}>
        <div className={styles.propertyList}>
          <h1 style={{ margin: "0px" }}>Propiedades más likeadas</h1>
          <List
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 0,
              overflow: "auto",
              margin: "0",
            }}
          >
            {properties?.map((casa) => (
              <ListItem
                style={{ width: "20em", marginRight: "2em" }}
                onClick={() => history.push(urls.viewProperty.byId(casa.id))}
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
  );
}
