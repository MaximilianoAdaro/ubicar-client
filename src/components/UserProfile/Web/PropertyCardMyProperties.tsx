import styles from "./UserProfile.module.scss";
import { Image } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import { Tooltip } from "@material-ui/core";
import pluralize from "pluralize";
import { useHistory } from "react-router-dom";
import { PropertyPreviewDTO } from "../../../api";
import clsx from "clsx";
import EditIcon from "@material-ui/icons/Edit";
import { urls } from "../../../constants";
import { selectPhotos } from "../../PhotosMethod";

interface ListingHouseProps {
  house: PropertyPreviewDTO;
  from: string;
  state: string;
  clickable: boolean;
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
      onClick={() =>
        props.clickable && history.push(urls.viewProperty.byId(props.house.id))
      }
    >
      <Grid xs={6}>
        <Image
          className={styles.propertiesImages}
          src={selectPhotos()}
          rounded
        />
      </Grid>
      <Grid xs={6} className={styles.propertyRight}>
        <Tooltip title={props.house.title}>
          <p
            className={clsx(styles.propertyTitle, styles.marginPaddingPTag)}
            style={{ marginBottom: "0.5em" }}
          >
            {props.house.title}
          </p>
        </Tooltip>
        <p
          className={clsx(
            styles.propertyPriceCondition,
            styles.marginPaddingPTag
          )}
          style={{ marginBottom: "0.5em" }}
        >
          U$D {props.house.price.toLocaleString()} &nbsp;|&nbsp;
          {props.house.condition === "SALE" ? "Venta" : "Alquiler"}
        </p>
        <p
          className={clsx(
            styles.propertySpecifications,
            styles.marginPaddingPTag
          )}
          style={{ marginBottom: "0.5em" }}
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
        <Grid container>
          <Grid xs={10}>
            <p
              className={clsx(
                styles.propertyTownCity,
                styles.marginPaddingPTag
              )}
            >
              {houseAddress?.state?.toLowerCase() ?? ""},{" "}
              {houseAddress?.city?.toLowerCase() ?? ""}
            </p>
          </Grid>
          <Grid xs={2}>
            <Tooltip
              title={"Editar propiedad"}
              className={styles.propertyListEditPropertyTooltip}
            >
              <EditIcon
                // size={10}
                onClick={() =>
                  history.push(urls.editProperty.byId(props.house.id))
                }
                className={styles.propertyListIcons}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
