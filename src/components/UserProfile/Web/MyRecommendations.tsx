import styles from "./UserProfile.module.scss";
import React from "react";
import { Grid, List, ListItem, Popover, Typography } from "@material-ui/core";
import { useGetRecommendations } from "../../../api";
import { PropretyCardMyFavorites } from "./PropertyCardMyFavorites";
import { urls } from "../../../constants";

export function MyRecommendations() {
  const { data } = useGetRecommendations();
  const [anchorFilter, setAnchorFilter] =
    React.useState<HTMLButtonElement | null>(null);
  if (!data) return <h1>Loading...</h1>;

  function filterCreation(filter: any) {
    return `Estas buscando
         ${
           filter.typeProperty
             ? `${
                 filter.typeProperty === "Casa" ? "una" : "un"
               } ${filter.typeProperty.toLowerCase()}`
             : "una propiedad"
         }
         ${
           filter.condition
             ? `en ${filter.condition === "SALE" ? "venta" : "alquiler"}`
             : ""
         }
         ${
           filter.minPrice
             ? `${
                 filter.maxPrice
                   ? `con precios entre U$D${filter.minPrice}`
                   : `con precio desde U$D${filter.minPrice},`
               }`
             : ""
         }
         ${
           filter.maxPrice
             ? `${
                 filter.minPrice
                   ? `y U$D${filter.maxPrice},`
                   : `con precio hasta U$D${filter.maxPrice},`
               }`
             : ""
         }
         ${
           filter.minAmountBathroom
             ? ` con más de ${filter.minAmountBathroom} baños, `
             : ""
         }
         ${
           filter.minAmountRoom
             ? `${
                 filter.maxAmountRoom
                   ? `con ${filter.minAmountRoom}`
                   : `con ${filter.minAmountRoom} ambientes,`
               }`
             : ""
         }
         ${
           filter.maxAmountRoom
             ? `${
                 filter.minAmountRoom
                   ? `- ${filter.maxAmountRoom} ambientes,`
                   : ` con hasta ${filter.maxAmountRoom} ambientes,`
               }`
             : ""
         }
         ${
           filter.minAmountSquareMeter
             ? `${
                 filter.maxAmountSquareMeter
                   ? `con ${filter.minAmountSquareMeter}`
                   : `con ${filter.minAmountSquareMeter} metros cuadrados,`
               }`
             : ""
         }
         ${
           filter.maxAmountSquareMeter
             ? `${
                 filter.minAmountSquareMeter
                   ? `-${filter.maxAmountSquareMeter} metros cuadrados,`
                   : `con hasta ${filter.maxAmountSquareMeter} metros cuadrados,`
               }`
             : ""
         }
         ${filter.style ? `con estilo ${filter.style}` : ""}`;
  }

  console.log(data);
  return (
    <div className={styles.recommendation_div}>
      <Grid>
        <p>
          Aqui puedes ver propiedades recomendadas en base a tus últimas
          busquedas en nuestra aplicación.
        </p>
      </Grid>
      <Grid>
        <Grid className={styles.recommendation_first_list}>
          {data[0].properties.length > 0 ? (
            <div>
              <h3>
                {filterCreation(data[0].filter)}y te gusto{" "}
                <a href={urls.viewProperty.byId(data[1].liked.id)}>
                  {" "}
                  esta propiedad
                </a>{" "}
                te recomendamos:
                {/*Como guardaste*/}
                {/*<Button*/}
                {/*  onClick={openFilterPopover}*/}
                {/*  style={{*/}
                {/*    textTransform: "none",*/}
                {/*    paddingBottom: "0",*/}
                {/*    color: "#007bff",*/}
                {/*    fontWeight:"bold"*/}
                {/*  }}*/}
                {/*>*/}
                {/*  <h3>estos filtros</h3>*/}
                {/*</Button>{" "}*/}
                {/*y te gusto{" "}*/}
                {/*<a href={urls.viewProperty.byId(data[0].liked.id)}>*/}
                {/*  {" "}*/}
                {/*  esta propiedad*/}
                {/*</a>{" "}*/}
                {/*te recomendamos:*/}
              </h3>
              <List
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 0,
                  overflow: "auto",
                  margin: "0",
                }}
              >
                {data[0]?.properties
                  .filter((casa: any) => casa.step == 7)
                  .map((casa: any) => (
                    <ListItem
                      className={styles.user_profile_favorites_recently_list}
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
          ) : (
            <h5 style={{ color: "gray" }}>
              No tenemos recomendaciones para usted.
            </h5>
          )}
        </Grid>
        <Grid className={styles.recommendation_second_list}>
          {data[1].properties.length > 0 ? (
            <div>
              <h3>
                {filterCreation(data[1].filter)}y te gusto{" "}
                <a href={urls.viewProperty.byId(data[1].liked.id)}>
                  {" "}
                  esta propiedad
                </a>{" "}
                te recomendamos:
              </h3>
              <List
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 0,
                  overflow: "auto",
                  margin: "0",
                }}
              >
                {data[1]?.properties
                  .filter((casa: any) => casa.step == 7)
                  .map((casa: any) => (
                    <ListItem
                      className={styles.user_profile_favorites_recently_list}
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
          ) : (
            <h5 style={{ color: "gray" }}>
              No tenemos recomendaciones para usted.
            </h5>
          )}
        </Grid>
        <Grid className={styles.recommendation_first_list}>
          {data[2].properties.length > 0 ? (
            <div>
              <h3>
                {filterCreation(data[2].filter)}y te gusto{" "}
                <a href={urls.viewProperty.byId(data[1].liked.id)}>
                  {" "}
                  esta propiedad
                </a>{" "}
                te recomendamos:
                {/*Como te gusto{" "}*/}
                {/*<a href={urls.viewProperty.byId(data[2].liked.id)}>*/}
                {/*  {" "}*/}
                {/*  esta propiedad*/}
                {/*</a>{" "}*/}
                {/*te recomendamos:*/}
              </h3>
              <List
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 0,
                  overflow: "auto",
                  margin: "0",
                }}
              >
                {data[2]?.properties
                  .filter((casa: any) => casa.step == 7)
                  .map((casa: any) => (
                    <ListItem
                      className={styles.user_profile_favorites_recently_list}
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
          ) : (
            <h5 style={{ color: "gray" }}>
              No tenemos recomendaciones para usted.
            </h5>
          )}
        </Grid>
      </Grid>
      <Popover
        style={{ marginTop: "5px", borderRadius: "5px" }}
        open={Boolean(anchorFilter)}
        anchorEl={anchorFilter}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() => setAnchorFilter(null)}
      >
        <List style={{ padding: "1em" }}>
          {Object.entries(data[0].filter).map(([key, value]) => (
            <Typography>{value !== null && `${key} : ${value}`}</Typography>
          ))}
        </List>
      </Popover>
    </div>
  );
}
