import styles from "./HomePageMobile.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";
import { useGetMostLikedPropertiesUsingGET } from "../../../api";
import { urls } from "../../../constants";
import { useHistory } from "react-router-dom";
import { HouseCardMobile } from "../../newListingHouse";

export function MostLikedMobile() {
  const { data: properties } = useGetMostLikedPropertiesUsingGET();
  const history = useHistory();

  return (
    <div className={styles.personalDataMainDiv}>
      <Grid className={styles.properties}>
        <div className={styles.propertyList}>
          <h4 className={styles.title}>Propiedades más likeadas</h4>
          <div className={styles.propertyCard}>
            {properties?.map((casa) => (
              <div
                onClick={() => history.push(urls.viewProperty.byId(casa.id))}
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
          </div>
        </div>
      </Grid>
    </div>
  );
}
