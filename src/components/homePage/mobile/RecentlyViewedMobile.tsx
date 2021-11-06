import styles from "./HomePageMobile.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";
import { ListItem, List } from "@material-ui/core";
import { PropretyCardMyFavorites } from "../../UserProfile/Web/PropertyCardMyFavorites";
import { useGetHomePagePropertiesUsingGET } from "../../../api";
import { urls } from "../../../constants";
import { useHistory } from "react-router-dom";
import { MostLikedMobile } from "./MostLikedMobile";
import { PropertyCardMobile } from "./PropertyCardMobile";

export function RecentlyViewedMobile() {
  const { data: properties, isLoading } = useGetHomePagePropertiesUsingGET();
  const history = useHistory();

  return (
    <div>
      {properties && properties?.length > 0 ? (
        <div className={styles.personalDataMainDiv}>
          <Grid className={styles.properties}>
            <div className={styles.propertyList}>
              <h5 className={styles.title}>Propiedades vistas recientemente</h5>
              <div className={styles.propertyCard}>
                {properties?.map((casa) => (
                  <div
                    onClick={() =>
                      history.push(urls.viewProperty.byId(casa.id))
                    }
                  >
                    <PropertyCardMobile
                      key={casa.id}
                      house={casa}
                      from={"properties"}
                      state={""}
                    />
                  </div>
                ))}
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
