import styles from "./UserProfileMobile.module.scss";

import React from "react";
import { Grid } from "@material-ui/core";
import { List, ListItem } from "@mui/material";
import { PropretyCardMyFavoritesMobile } from "./PropertyCardMyFavoritesMobile";

type RecommendationListProps = {
  data: any | null;
  listNumber: number;
};

export function RecommendationList({
  data,
  listNumber,
}: RecommendationListProps) {
  return (
    <Grid>
      <div className={styles.propertyList}>
        <h4>Recomendacion {listNumber}</h4>
        {data.status === "success" && data?.data.length > 0 ? (
          <div>
            <List>
              {data?.data
                .slice(0, 5)
                .filter((casa: any) => casa.step == 7)
                .map((casa: any) => (
                  <ListItem style={{ width: "20em" }}>
                    <PropretyCardMyFavoritesMobile
                      key={casa.id}
                      house={casa}
                      from={"properties"}
                      state={""}
                    />
                  </ListItem>
                ))}
            </List>
          </div>
        ) : (
          <h5 style={{ color: "gray" }}>
            Empieza likeando propiedades para poder recomendarte propiedades.
          </h5>
        )}
      </div>
    </Grid>
  );
}
