import styles from "./UserProfileMobile.module.scss";
import { Image } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import pluralize from "pluralize";
import { PropertyPreviewDTO } from "../../../api";
import clsx from "clsx";

interface ListingHouseProps {
  house: PropertyPreviewDTO;
  from: string;
  state: string;
}

const photos = [
  "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2UlMjBleHRlcmlvcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
  // 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/2/7/3/BP_HHMTN310_Bolden_home-exterior_AFTER_0132.jpg.rend.hgtvcom.966.644.suffix/1549585070420.jpeg",
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
      <Grid xs style={{ maxWidth: "50%" }}>
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
            ${props.house.price.toLocaleString()} &nbsp;|&nbsp; En{" "}
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
