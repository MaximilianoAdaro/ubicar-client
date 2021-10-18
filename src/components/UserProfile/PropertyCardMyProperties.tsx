import styles from "./UserProfile.module.scss";
import { Image } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import { Tooltip } from "@material-ui/core";
import pluralize from "pluralize";
import { useHistory } from "react-router-dom";
import { PropertyPreviewDTO } from "../../api";
import clsx from "clsx";

interface ListingHouseProps {
  house: PropertyPreviewDTO;
  from: string;
  state: string;
}

export function PropertyCardMyProperties(props: ListingHouseProps) {
  const history = useHistory();
  const houseAddress = props.house.address;
  const houseStreetNumber = `${houseAddress?.street ?? ""} ${
    houseAddress?.number ?? ""
  }`;
  const baths = pluralize("baño", props.house.fullBaths);
  return (
    <Grid
      container
      className={styles.propertyInformation}
      // onClick={() =>
      //    clickable && history.push(urls.viewProperty.byId(props.house.id))
      // }
    >
      <Grid xs={6}>
        <Image
          className={styles.propertiesImages}
          src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
          rounded
        />
      </Grid>
      <Grid xs={6} className={styles.propertyRight}>
        <Tooltip title={props.house.title}>
          <p className={clsx(styles.propertyTitle, styles.marginPaddingPTag)}>
            {props.house.title}
          </p>
        </Tooltip>
        <p
          className={clsx(
            styles.propertyPriceCondition,
            styles.marginPaddingPTag
          )}
        >
          ${props.house.price.toLocaleString()} &nbsp;|&nbsp; En{" "}
          {props.house.condition === "SALE" ? "Venta" : "Alquiler"}
        </p>
        <p
          className={clsx(
            styles.propertySpecifications,
            styles.marginPaddingPTag
          )}
        >
          {props.house.squareFoot} m² &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
          {props.house.rooms} hab. &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
          {props.house.fullBaths} {baths}
        </p>
        <Tooltip title={houseStreetNumber}>
          <p
            className={clsx(
              styles.propertyStreetNumber,
              styles.marginPaddingPTag
            )}
          >
            {houseStreetNumber}
          </p>
        </Tooltip>
        <p className={clsx(styles.propertyTownCity, styles.marginPaddingPTag)}>
          {houseAddress?.state ?? ""}, {houseAddress?.city ?? ""}
        </p>
      </Grid>
    </Grid>
  );
}
