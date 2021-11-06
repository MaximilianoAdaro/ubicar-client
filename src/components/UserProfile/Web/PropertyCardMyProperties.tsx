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
          ${props.house.price.toLocaleString()} &nbsp;|&nbsp; En{" "}
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
