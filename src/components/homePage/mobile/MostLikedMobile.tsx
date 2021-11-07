import styles from "./HomePageMobile.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";
import { useGetMostLikedPropertiesUsingGET } from "../../../api";
import { urls } from "../../../constants";
import { useHistory } from "react-router-dom";

import { PropertyCardMobile } from "./PropertyCardMobile";

export function MostLikedMobile() {
  const { data: properties, isLoading } = useGetMostLikedPropertiesUsingGET();
  const history = useHistory();

  return (
    <div className={styles.personalDataMainDiv}>
      <Grid className={styles.properties}>
        <div className={styles.propertyList}>
          <h5 className={styles.title}>Propiedades más likeadas</h5>
          <div className={styles.propertyCard}>
            {properties?.map((casa) => (
              <div
                onClick={() => history.push(urls.viewProperty.byId(casa.id))}
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
  );
}
