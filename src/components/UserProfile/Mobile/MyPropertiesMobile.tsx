import styles from "./UserProfileMobile.module.scss";

import React, { useState } from "react";
import { Button, Grid, withStyles } from "@material-ui/core";
import { useGetMyPropertiesUsingGET } from "../../../api";
import { urls } from "../../../constants";
import { Link, useHistory } from "react-router-dom";
import { PropertyCardMyPropertiesMobile } from "./PropertyCardMyPropertiesMobile";
import { RiArrowLeftSLine } from "react-icons/all";

const StyledButton = withStyles({
  root: {
    textTransform: "none",
    fontSize: "1.05em",
    textAlign: "center",
    width: "100%",
  },
})(Button);

export function MyPropertiesMobile() {
  // const history = useHistory();
  const [propertyComponent, setPropertyComponent] = useState("Published");

  const changeSinPublicar = (event: any) => {
    setPropertyComponent("NotPublished");
  };

  const changePublicar = (event: any) => {
    setPropertyComponent("Published");
  };

  return (
    <Grid className={styles.user_profile_container}>
      <Grid className={styles.user_profile_title}>
        <h3>Mis Propiedades</h3>
      </Grid>
      <Grid className={styles.user_profile_go_back}>
        <Link to={urls.userProfile.path}>
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
        </Link>
      </Grid>
      <Grid>
        <Grid>
          <p className={styles.user_profile_tab_description}>
            Aqui puedes ver tus propiedades publicadas y sin publicar.
          </p>
        </Grid>
      </Grid>
      <Grid>
        <Grid>
          <Grid>
            <Grid container>
              <Grid xs>
                <StyledButton onClick={changePublicar} className={styles.hola}>
                  Publicar
                </StyledButton>
              </Grid>
              <Grid xs>
                <StyledButton onClick={changeSinPublicar}>
                  Sin Publicar
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={styles.my_property_properties_list}>
            {propertyComponent === "Published" && <PublishedProperties />}
            {propertyComponent === "NotPublished" && <UnpublishedProperties />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const PublishedProperties = () => {
  const data = useGetMyPropertiesUsingGET();

  return (
    <Grid className={styles.properties} xs>
      {data.status === "success" &&
      data?.data.filter((casa) => casa.step === 7).length > 0 ? (
        <div>
          <Grid className={styles.published_property_list}>
            {data?.data
              .filter((casa) => casa.step === 7)
              .map((casa) => (
                <PropertyCardMyPropertiesMobile
                  key={casa.id}
                  house={casa}
                  from={"properties"}
                  state={""}
                />
              ))}
          </Grid>
        </div>
      ) : (
        <h5 style={{ color: "gray" }}>No tienes propiedades publicadas.</h5>
      )}
    </Grid>
  );
};

const UnpublishedProperties = () => {
  const data = useGetMyPropertiesUsingGET();

  return (
    <Grid className={styles.properties} xs>
      {data.status === "success" &&
      data?.data.filter((casa) => casa.step < 7).length > 0 ? (
        <div>
          <Grid className={styles.published_property_list}>
            {data?.data
              .filter((casa) => casa.step < 7)
              .map((casa) => (
                <Grid>
                  <PropertyCardMyPropertiesMobile
                    key={casa.id}
                    house={casa}
                    from={"properties"}
                    state={"notfinished"}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
      ) : (
        <h5 style={{ color: "gray" }}>No tienes ninguna propiedad guardada.</h5>
      )}
    </Grid>
  );
};
