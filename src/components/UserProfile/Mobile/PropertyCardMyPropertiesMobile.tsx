import styles from "./UserProfileMobile.module.scss";
import { Image } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import pluralize from "pluralize";
import { PropertyPreviewDTO } from "../../../api";
import clsx from "clsx";
import { selectPhotos } from "../../PhotosMethod";

interface ListingHouseProps {
  house: PropertyPreviewDTO;
  from: string;
  state: string;
}

export function PropertyCardMyPropertiesMobile(props: ListingHouseProps) {
  // const history = useHistory();
  const houseAddress = props.house.address;
  const houseStreetNumber = `${houseAddress?.street ?? ""} ${
    houseAddress?.number ?? ""
  }`;
  const addressStateCity = `${houseAddress?.state ?? ""}, ${
    houseAddress?.city?.toLowerCase() ?? ""
  }`;
  const baths = pluralize("baño", props.house.fullBaths);
  return (
    <Grid container className={styles.my_property_card}>
      <Grid xs={7}>
        <Grid
          className={clsx(
            styles.my_property_card_title,
            styles.my_property_card_grid
          )}
        >
          <span>{props.house.title}</span>
        </Grid>
        <Grid>
          <p
            style={{
              textTransform: "capitalize",
              fontWeight: "bold",
              margin: "0",
            }}
            className={styles.my_property_card_title}
          >
            {houseStreetNumber}
          </p>
        </Grid>
        <Grid
          className={clsx(
            styles.my_property_card_title,
            styles.my_property_card_grid
          )}
        >
          <span style={{ textTransform: "capitalize" }}>
            {addressStateCity}
          </span>
        </Grid>
        <Grid className={styles.my_property_card_grid}>
          <span>
            {props.house.squareFoot} m² &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
            {props.house.rooms} hab. &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
            {props.house.fullBaths} {baths}
          </span>
        </Grid>
        <Grid>
          <span style={{ fontWeight: "bold" }}>
            U$D {props.house.price.toLocaleString()} &nbsp;|&nbsp;
            {props.house.condition === "SALE" ? "Venta" : "Alquiler"}
          </span>
        </Grid>
      </Grid>
      <Grid xs>
        <Image
          src={selectPhotos()}
          rounded
          className={styles.my_property_card_image}
        />
      </Grid>
    </Grid>
  );
}
