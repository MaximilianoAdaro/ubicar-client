import { PropertyPreviewDTO } from "../../../api";
import { Grid } from "@material-ui/core";
import { Image } from "react-bootstrap";
import styles from "./UserProfileMobile.module.scss";
import { useHistory } from "react-router-dom";
import pluralize from "pluralize";
import { urls } from "../../../constants";
import { selectPhotos } from "../../PhotosMethod";

interface ListingHouseProps {
  house: PropertyPreviewDTO;
  from: string;
  state: string;
}

export function PropretyCardMyFavoritesMobile(props: ListingHouseProps) {
  const house = props.house;
  const history = useHistory();
  const houseAddress = house.address;
  const houseStreetNumber = `${houseAddress?.street ?? ""} ${
    houseAddress?.number ?? ""
  }`;
  const addressStateCity = `${houseAddress?.state ?? ""}, ${
    houseAddress?.city?.toLowerCase() ?? ""
  }`;
  const baths = pluralize("baño", house.fullBaths);

  return (
    <div>
      <Grid
        className={styles.my_favorite_card_outer_div}
        onClick={() => history.push(urls.viewProperty.byId(house.id))}
      >
        <Grid className={styles.container}>
          <Grid>
            <Image
              className={styles.my_favorites_property_image}
              src={selectPhotos()}
              rounded
            />
          </Grid>
          <Grid>
            <Grid className={styles.my_favorite_card_title_grid}>
              <span className={styles.my_favorite_card_title}>
                {house.title}
              </span>
            </Grid>
            <Grid>
              <span className={styles.my_favorite_card_street_number}>
                {houseStreetNumber}
              </span>
            </Grid>
            <Grid>
              <span className={styles.my_favorite_card_state_city}>
                {addressStateCity}
              </span>
            </Grid>
            <Grid className={styles.my_favorite_card_specifications_grid}>
              <span className={styles.my_favorite_card_specifications}>
                {house.rooms} hab. &nbsp;&nbsp;|&nbsp;&nbsp; {house.fullBaths}{" "}
                {baths} &nbsp;&nbsp;|&nbsp;&nbsp; {house.coveredSquareFoot} m²
                &nbsp;&nbsp;
              </span>
            </Grid>
            <Grid className={styles.my_favorite_card_price_condition_grid}>
              <span className={styles.myPropertyPriceCondition}>
                ${house.price.toLocaleString()}
                &nbsp;|&nbsp;
                {house.condition == "SALE" ? "Venta" : "Alquiler"}{" "}
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
