import React from "react";
import Grid from "@material-ui/core/Grid";
import { ListingHouse } from "../../components/listingHouse";
import { useQuery } from "react-query";
import axios from "axios";
import styles from "./ListingPage.module.scss";
import { ListingFilters } from "../../components/listingFilters";

const casa1 = {
  title: "Gran casa",
  price: 200000,
  condition: "Sale",
  squareFoot: 500,
  rooms: 5,
  toilettes: 4,
  street: "Av.Cabildo",
  number: 500,
  town: "Belgrano",
  city: "Buenos Aires",
};
const casa2 = {
  title: "Gran casa",
  price: 200000,
  condition: "Sale",
  squareFoot: 500,
  rooms: 5,
  toilettes: 4,
  street: "Av.Cabildo",
  number: 500,
  town: "Belgrano",
  city: "Buenos Aires",
};
const casa3 = {
  title: "Gran casa",
  price: 200000,
  condition: "Sale",
  squareFoot: 500,
  rooms: 5,
  toilettes: 4,
  street: "Av.Cabildo",
  number: 500,
  town: "Belgrano",
  city: "Buenos Aires",
};
const casas = [casa1, casa2, casa3];
export function ListingPage() {
  const { data, status } = useQuery("propertyPreview", async () => {
    const { data } = await axios.get("/preview?page=1");
    return data;
  });

  console.log(data);

  return (
    <div>
      <ListingFilters />
      <Grid container className={styles.mapAndProperties}>
        <Grid item xl={9} sm={8}>
          <h1>Mapa</h1>
        </Grid>
        <Grid item xl={3} sm={4}>
          {/*{status == "error" && (*/}
          {/*  <h1>There was an error retrieving the properties</h1>*/}
          {/*)}*/}
          {/*{status == "success" &&*/}
          {/*  data.content.map((casa: any) => (*/}
          {/*    <ListingHouse key={casa.id} house={casa} />*/}
          {/*  ))}*/}
          {casas.map((casa: any) => (
            <ListingHouse house={casa} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
  // <Container className={styles.listingPageContainer}>
  //     <ListingFilters/>
  //     <Row>
  //         <Col className={styles.listingPageCol}  id='RightPhoto' md={7}>
  //             Aca va el mapa
  //         </Col>
  //         <Col className={styles.listingPageCol} md={4}>

  //         </Col>
  //     </Row>
  // </Container>
}
