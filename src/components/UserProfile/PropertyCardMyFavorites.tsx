import { PropertyPreviewDTO } from "../../api";
import { Grid, makeStyles } from "@material-ui/core";
import { Image } from "react-bootstrap";
import styles from "./UserProfile.module.scss";
import { useHistory } from "react-router-dom";
import pluralize from "pluralize";
import { Tooltip } from "@material-ui/core";
import { urls } from "../../constants";

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
  const baths = pluralize("baño", house.fullBaths);

  return (
    <div onClick={() => history.push(urls.viewProperty.byId(house.id))}>
      <Grid className={styles.my_favorite_card_outer_div}>
        <Grid className={styles.container}>
          <Grid>
            <Image
              className={styles.my_favorities_property_image}
              src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
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
            <p className={styles.myPropertyStreetNumber}>{houseStreetNumber}</p>
            <p className={styles.myPropertyTownCity}>
              {houseAddress?.state ?? ""}, {houseAddress?.city ?? ""}
            </p>
            <Tooltip
              title={
                <Grid className={styles.userProfileToolTips}>
                  {house.rooms} habitaciones <br />
                  {house.fullBaths} {baths} <br />
                  {house.coveredSquareFoot} m²
                  <br />
                </Grid>
              }
              classes={{ tooltip: classes.customWidth }}
              placement="bottom-start"
            >
              <p className={styles.myPropertySpecifications}>
                {house.rooms} hab. &nbsp;&nbsp;|&nbsp;&nbsp; {house.fullBaths}{" "}
                {baths} &nbsp;&nbsp;|&nbsp;&nbsp; {house.coveredSquareFoot} m²
                &nbsp;&nbsp;
              </p>
            </Tooltip>
            <p className={styles.myPropertyPriceCondition}>
              ${house.price.toLocaleString()}
              &nbsp;|&nbsp; En{" "}
              {house.condition == "SALE" ? "Venta" : "Alquiler"}{" "}
            </p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
