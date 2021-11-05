import { PropertyPreviewDTO } from "../../../api";
import { Grid, makeStyles } from "@material-ui/core";
import { Image } from "react-bootstrap";
import styles from "./UserProfileMobile.module.scss";
import { useHistory } from "react-router-dom";
import pluralize from "pluralize";
import { urls } from "../../../constants";

interface ListingHouseProps {
  house: PropertyPreviewDTO;
  from: string;
  state: string;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  customWidth: {
    maxWidth: 500,
    fontSize: "0.75em",
  },
  noMaxWidth: {
    maxWidth: "none",
    fontSize: "1em",
  },
}));

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

  const photos = [
    "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2UlMjBleHRlcmlvcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    "https://media.istockphoto.com/photos/modern-custom-suburban-home-exterior-picture-id1255835529?b=1&k=20&m=1255835529&s=170667a&w=0&h=Z-RskiXf6fx_c0s64LAuCWhmS-cJ5Nli4p7lZtqa7R4=",
    "https://assets.themortgagereports.com/wp-content/uploads/2020/12/Buy-A-Home-With-Low-No-Down-Payment-First-Time-Home-Buyer.jpg",
  ];

  function getRandomIntInclusive(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  const selectPhotos = () => {
    return photos[getRandomIntInclusive(0, photos.length - 1)];
  };

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
                &nbsp;|&nbsp; En{" "}
                {house.condition == "SALE" ? "Venta" : "Alquiler"}{" "}
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
