import { PropertyPreviewDTO } from "../../../api";
import { Grid, makeStyles } from "@material-ui/core";
import { Image } from "react-bootstrap";
import styles from "./UserProfile.module.scss";
import { useHistory } from "react-router-dom";
import pluralize from "pluralize";
import { Tooltip } from "@material-ui/core";
import { urls } from "../../../constants";
import { selectPhotos } from "../../PhotosMethod";

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

export function PropretyCardMyFavorites(props: ListingHouseProps) {
  const classes = useStyles();
  const house = props.house;
  const history = useHistory();
  const houseAddress = house.address;
  const houseStreetNumber = `${houseAddress?.street ?? ""} ${
    houseAddress?.number ?? ""
  }`;
  const houseStateCity = `${houseAddress?.state?.toLowerCase() ?? ""}, ${
    houseAddress?.city?.toLowerCase() ?? ""
  }`;
  const baths = pluralize("baño", house.fullBaths);

  return (
    <div>
      <Grid
        className={styles.my_favorite_card_outer_div}
        onClick={() => history.push(urls.viewProperty.byId(house.id))}
      >
        <Grid className={styles.my_favorites_card_container}>
          <Grid>
            <Image
              className={styles.my_favorities_property_image}
              src={selectPhotos()}
              rounded
            />
          </Grid>
          <Grid>
            <Tooltip
              title={
                <Grid className={styles.userProfileToolTips}>
                  {house.title}
                </Grid>
              }
              classes={{ tooltip: classes.noMaxWidth }}
              placement="bottom-start"
            >
              <p className={styles.myPropertyTitle}>{house.title}</p>
            </Tooltip>
            <p className={styles.myPropertyStreetNumber}>
              {houseStreetNumber.toLowerCase()}
            </p>
            <p
              className={styles.myPropertyTownCity}
              // style={{ marginBottom: "0.6em" }}
            >
              {houseStateCity}
            </p>
            <p className={styles.myPropertySpecifications}>
              {house.rooms} hab. &nbsp;&nbsp;|&nbsp;&nbsp; {house.fullBaths}{" "}
              {baths} &nbsp;&nbsp;|&nbsp;&nbsp; {house.coveredSquareFoot} m²
              &nbsp;&nbsp;
            </p>
            <p className={styles.myPropertyPriceCondition}>
              U$D {house.price.toLocaleString()}
              &nbsp;|&nbsp;
              {house.condition == "SALE" ? "Venta" : "Alquiler"}{" "}
            </p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
