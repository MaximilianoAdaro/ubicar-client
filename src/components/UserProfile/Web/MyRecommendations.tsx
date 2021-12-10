import styles from "./UserProfile.module.scss";
import React from "react";
import { Grid } from "@material-ui/core";
import { useGetRecommendations } from "../../../api";
import { Recommendations } from "../../homePage/Recommendations";

export const formatPrice = (price: number) =>
  new Intl.NumberFormat(undefined).format(price);

export function MyRecommendations() {
  const { data } = useGetRecommendations();
  const [anchorFilter, setAnchorFilter] =
    React.useState<HTMLButtonElement | null>(null);
  if (!data) return <h1>Loading...</h1>;

  function getLocation(location: string) {
    const array = location.split(", ");
    const arrayInter = array[0].split(" ");
    if (arrayInter.length > 1) {
      return (
        arrayInter[0][0].toUpperCase() +
        arrayInter[0].substr(1, arrayInter[0].length) +
        " " +
        arrayInter[1][0].toUpperCase() +
        arrayInter[1].substr(1, arrayInter[1].length)
      );
    } else
      return array[0][0].toUpperCase() + array[0].substr(1, array[0].length);
  }

  function filterCreation(filter: any) {
    return `Como estas buscando
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
                   ? `con precios entre U$D${formatPrice(filter.minPrice)}`
                   : `con precio desde U$D${formatPrice(filter.minPrice)},`
               }`
             : ""
         }
         ${
           filter.maxPrice
             ? `${
                 filter.minPrice
                   ? `y U$D${formatPrice(filter.maxPrice)},`
                   : `con precio hasta U$D${formatPrice(filter.maxPrice)},`
               }`
             : ""
         }
         ${
           filter.minAmountBathroom
             ? ` con más de ${filter.minAmountBathroom} ${
                 filter.minAmountBathroom === 1 ? "baño" : "baños"
               }, `
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
                   ? `- ${filter.maxAmountSquareMeter} metros cuadrados,`
                   : `con hasta ${filter.maxAmountSquareMeter} metros cuadrados,`
               }`
             : ""
         }
         ${filter.style ? `con estilo ${filter.style},` : ""}
         ${filter.location ? `en ${getLocation(filter.location)} ` : ""}`;
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
        {data.length > 0 ? (
          <Grid>
            <Recommendations recommendationNumber={0} />
            <Recommendations recommendationNumber={1} />
            <Recommendations recommendationNumber={2} />
          </Grid>
        ) : (
          <Grid>
            <h5 style={{ color: "gray" }}>
              No tenemos propiedades recomendadas para ti.
            </h5>
          </Grid>
        )}
        {/*<Recommendations recommendationNumber={0} />*/}
        {/*<Recommendations recommendationNumber={1} />*/}
        {/*<Recommendations recommendationNumber={2} />*/}
        {/*<Grid className={styles.recommendation_first_list}>*/}
        {/*  {data[0].properties.length > 0 ? (*/}
        {/*    <div>*/}
        {/*      <h3>*/}
        {/*        {filterCreation(data[0].filter)}y te gusto{" "}*/}
        {/*        <a href={urls.viewProperty.byId(data[1].liked.id)}>*/}
        {/*          {" "}*/}
        {/*          esta propiedad*/}
        {/*        </a>{" "}*/}
        {/*        te recomendamos:*/}
        {/*      </h3>*/}
        {/*      <List*/}
        {/*        style={{*/}
        {/*          display: "flex",*/}
        {/*          flexDirection: "row",*/}
        {/*          padding: 0,*/}
        {/*          overflow: "auto",*/}
        {/*          margin: "0",*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        {data[0]?.properties*/}
        {/*          .filter((casa: any) => casa.step == 7)*/}
        {/*          .map((casa: any) => (*/}
        {/*            <ListItem*/}
        {/*              className={styles.user_profile_favorites_recently_list}*/}
        {/*            >*/}
        {/*              <PropretyCardMyFavorites*/}
        {/*                key={casa.id}*/}
        {/*                house={casa}*/}
        {/*                from={"properties"}*/}
        {/*                state={""}*/}
        {/*              />*/}
        {/*            </ListItem>*/}
        {/*          ))}*/}
        {/*      </List>*/}
        {/*    </div>*/}
        {/*  ) : (*/}
        {/*    <h5 style={{ color: "gray" }}>*/}
        {/*      No tenemos recomendaciones para usted.*/}
        {/*    </h5>*/}
        {/*  )}*/}
        {/*</Grid>*/}
        {/*<Grid className={styles.recommendation_second_list}>*/}
        {/*  {data[1].properties.length > 0 ? (*/}
        {/*    <div>*/}
        {/*      <h3>*/}
        {/*        {filterCreation(data[1].filter)}y te gusto{" "}*/}
        {/*        <a href={urls.viewProperty.byId(data[1].liked.id)}>*/}
        {/*          {" "}*/}
        {/*          esta propiedad*/}
        {/*        </a>{" "}*/}
        {/*        te recomendamos:*/}
        {/*      </h3>*/}
        {/*      <List*/}
        {/*        style={{*/}
        {/*          display: "flex",*/}
        {/*          flexDirection: "row",*/}
        {/*          padding: 0,*/}
        {/*          overflow: "auto",*/}
        {/*          margin: "0",*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        {data[1]?.properties*/}
        {/*          .filter((casa: any) => casa.step == 7)*/}
        {/*          .map((casa: any) => (*/}
        {/*            <ListItem*/}
        {/*              className={styles.user_profile_favorites_recently_list}*/}
        {/*            >*/}
        {/*              <PropretyCardMyFavorites*/}
        {/*                key={casa.id}*/}
        {/*                house={casa}*/}
        {/*                from={"properties"}*/}
        {/*                state={""}*/}
        {/*              />*/}
        {/*            </ListItem>*/}
        {/*          ))}*/}
        {/*      </List>*/}
        {/*    </div>*/}
        {/*  ) : (*/}
        {/*    <h5 style={{ color: "gray" }}>*/}
        {/*      No tenemos recomendaciones para usted.*/}
        {/*    </h5>*/}
        {/*  )}*/}
        {/*</Grid>*/}
        {/*<Grid className={styles.recommendation_first_list}>*/}
        {/*  {data[2].properties.length > 0 ? (*/}
        {/*    <div>*/}
        {/*      <h3>*/}
        {/*        {filterCreation(data[2].filter)}y te gusto{" "}*/}
        {/*        <a href={urls.viewProperty.byId(data[1].liked.id)}>*/}
        {/*          {" "}*/}
        {/*          esta propiedad*/}
        {/*        </a>{" "}*/}
        {/*        te recomendamos:*/}
        {/*        /!*Como te gusto{" "}*!/*/}
        {/*        /!*<a href={urls.viewProperty.byId(data[2].liked.id)}>*!/*/}
        {/*        /!*  {" "}*!/*/}
        {/*        /!*  esta propiedad*!/*/}
        {/*        /!*</a>{" "}*!/*/}
        {/*        /!*te recomendamos:*!/*/}
        {/*      </h3>*/}
        {/*      <List*/}
        {/*        style={{*/}
        {/*          display: "flex",*/}
        {/*          flexDirection: "row",*/}
        {/*          padding: 0,*/}
        {/*          overflow: "auto",*/}
        {/*          margin: "0",*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        {data[2]?.properties*/}
        {/*          .filter((casa: any) => casa.step == 7)*/}
        {/*          .map((casa: any) => (*/}
        {/*            <ListItem*/}
        {/*              className={styles.user_profile_favorites_recently_list}*/}
        {/*            >*/}
        {/*              <PropretyCardMyFavorites*/}
        {/*                key={casa.id}*/}
        {/*                house={casa}*/}
        {/*                from={"properties"}*/}
        {/*                state={""}*/}
        {/*              />*/}
        {/*            </ListItem>*/}
        {/*          ))}*/}
        {/*      </List>*/}
        {/*    </div>*/}
        {/*  ) : (*/}
        {/*    <h5 style={{ color: "gray" }}>*/}
        {/*      No tenemos recomendaciones para usted.*/}
        {/*    </h5>*/}
        {/*  )}*/}
        {/*</Grid>*/}
      </Grid>
    </div>
  );
}
