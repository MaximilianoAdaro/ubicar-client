import styles from "./HouseCardMobile.module.scss";
import { Image } from "react-bootstrap";
import { Tooltip } from "@material-ui/core";
import pluralize from "pluralize";
import { useHistory } from "react-router-dom";
import { urls } from "../../../constants";
import { PropertyPreviewDTO } from "../../../api";
import clsx from "clsx";

export interface HouseCardProps {
  house: PropertyPreviewDTO;
  clickable?: boolean;
  isLarge?: boolean;
}

export function HouseCardMobile({
  house,
  clickable = true,
  isLarge = false,
}: HouseCardProps) {
  const history = useHistory();
  const houseAddress = house.address;
  const houseStreetNumber = `${houseAddress?.street ?? ""} ${
    houseAddress?.number ?? ""
  }`;
  const stateCity =
    houseAddress?.city && houseAddress.state
      ? `${houseAddress?.city}, ${houseAddress.state}`
      : "";
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

  if (isLarge)
    return (
      <div
        className={clsx(styles.large, styles.cardContainer)}
        onClick={() =>
          clickable && history.push(urls.viewProperty.byId(house.id))
        }
      >
        <div>
          <Image
            className={styles.imageContainer}
            src={selectPhotos()}
            rounded
          />
        </div>
        <div className={styles.infoContainer}>
          <Tooltip title={house.title}>
            <span className={styles.title}>{house.title}</span>
          </Tooltip>
          <div className={styles.price}>${house.price.toLocaleString()}</div>
          <div className={styles.details}>
            {house.squareFoot} m² &nbsp;&nbsp;|&nbsp;&nbsp; {house.rooms} hab.
            &nbsp;&nbsp;|&nbsp;&nbsp; {house.fullBaths} {baths}
            &nbsp;&nbsp;|&nbsp;&nbsp; En{" "}
            {house.condition === "SALE" ? "Venta" : "Alquiler"}
          </div>
          <div className={styles.address}>
            <span className={styles.streetNumber}>{houseStreetNumber}</span>
            <span className={styles.stateCity}> {stateCity}</span>
          </div>
        </div>
      </div>
    );

  return (
    <div
      className={styles.cardContainer}
      onClick={() =>
        clickable && history.push(urls.viewProperty.byId(house.id))
      }
    >
      <div>
        <Image className={styles.imageContainer} src={selectPhotos()} rounded />
      </div>
      <div className={styles.infoContainer}>
        <Tooltip title={house.title}>
          <span className={styles.title}>{house.title}</span>
        </Tooltip>
        <div className={styles.address}>
          <span className={styles.streetNumber}>{houseStreetNumber}</span>
          <span className={styles.stateCity}> {stateCity}</span>
        </div>

        <div className={styles.details}>
          {house.squareFoot} m² &nbsp;&nbsp;|&nbsp;&nbsp; {house.rooms} hab.
          &nbsp;&nbsp;|&nbsp;&nbsp; {house.fullBaths} {baths}
          &nbsp;&nbsp;|&nbsp;&nbsp; En{" "}
          {house.condition === "SALE" ? "Venta" : "Alquiler"}
        </div>
        <div className={styles.price}>${house.price.toLocaleString()}</div>
      </div>
    </div>
  );
}
