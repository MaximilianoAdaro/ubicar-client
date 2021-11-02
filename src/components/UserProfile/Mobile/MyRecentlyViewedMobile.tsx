import styles from "./UserProfileMobile.module.scss";

import React from "react";
import { Button, Grid } from "@material-ui/core";
import { useGetAllRecentlyViewedPropertiesUsingGET } from "../../../api";
import { Link } from "react-router-dom";
import { urls } from "../../../constants";
import { RiArrowLeftSLine } from "react-icons/all";

export function MyRecentlyViewedMobile() {
  const data = useGetAllRecentlyViewedPropertiesUsingGET();
  return (
    <Grid className={styles.user_profile_container}>
      <Grid className={styles.user_profile_title}>
        <h3 style={{ textAlign: "center" }}>Perfil</h3>
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
      <Grid>Recently Viewed</Grid>
    </Grid>
    // <div className={styles.personalDataMainDiv}>
    //   <Grid>
    //     <p>Aqui puedes ver las últimas 50 propiedades que viste</p>
    //   </Grid>
    //   <Grid className={styles.properties}>
    //     <div className={styles.propertyList}>
    //       {data.status === "success" && data?.data.length > 0 ? (
    //         <div>
    //           <h3>Propiedades recientemente vistas</h3>
    //           <List
    //             style={{
    //               display: "flex",
    //               flexDirection: "row",
    //               padding: 0,
    //               overflow: "auto",
    //               margin: "0",
    //             }}
    //           >
    //             {data?.data
    //               .filter((casa) => casa.step == 7)
    //               .map((casa) => (
    //                 <ListItem style={{ width: "20em" }}>
    //                   <PropretyCardMyFavorites
    //                     key={casa.id}
    //                     house={casa}
    //                     from={"properties"}
    //                     state={""}
    //                   />
    //                 </ListItem>
    //               ))}
    //           </List>
    //         </div>
    //       ) : (
    //         <h5 style={{ color: "gray" }}>No viste ninguna propiedad.</h5>
    //       )}
    //     </div>
    //   </Grid>
    // </div>
  );
}
