import styles from "./HomePage.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";
import { ListItem, List } from "@material-ui/core";
import { PropretyCardMyFavorites } from "../UserProfile/PropertyCardMyFavorites";
import { useGetHomePagePropertiesUsingGET } from "../../api";
import { urls } from "../../constants";
import { useHistory } from "react-router-dom";

export function RecentlyViewed() {
  const { data: properties, isLoading } = useGetHomePagePropertiesUsingGET();
  const history = useHistory();

  return (
    <div className={styles.personalDataMainDiv}>
      <Grid className={styles.properties}>
        <div className={styles.propertyList}>
          <div>
            <h1 style={{ margin: "0px" }}>
              Propiedades recientemente vistas por vos
            </h1>
          </div>
          {properties && properties?.length > 0 ? (
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
                  style={{ width: "20em" }}
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
          ) : (
            <div>
              <h3>Todavía no viste ninguna propiedad</h3>
            </div>
          )}
        </div>
      </Grid>
    </div>
  );
}
