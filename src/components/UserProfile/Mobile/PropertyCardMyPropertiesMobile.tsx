import styles from "./UserProfileMobile.module.scss";
import { Image } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import pluralize from "pluralize";
import { useHistory } from "react-router-dom";
import { PropertyPreviewDTO } from "../../../api";
import clsx from "clsx";

interface ListingHouseProps {
  house: PropertyPreviewDTO;
  from: string;
  state: string;
}

export function PropertyCardMyPropertiesMobile(props: ListingHouseProps) {
  const history = useHistory();
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
          <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
            {houseStreetNumber}
          </span>
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
          src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
          rounded
          className={styles.my_property_card_image}
        />
      </Grid>
    </Grid>
    // <Grid
    //   container
    //   className={styles.propertyInformation}
    //   // onClick={() =>
    //   //    clickable && history.push(urls.viewProperty.byId(props.house.id))
    //   // }
    // >
    //   <Grid xs={6}>
    //     <Image
    //       className={styles.propertiesImages}
    //       src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
    //       rounded
    //     />
    //   </Grid>
    //   <Grid xs={6} className={styles.propertyRight}>
    //     <Tooltip title={props.house.title}>
    //       <p className={clsx(styles.propertyTitle, styles.marginPaddingPTag)}>
    //         {props.house.title}
    //       </p>
    //     </Tooltip>
    //     <p
    //       className={clsx(
    //         styles.propertyPriceCondition,
    //         styles.marginPaddingPTag
    //       )}
    //     >
    //       ${props.house.price.toLocaleString()} &nbsp;|&nbsp; En{" "}
    //       {props.house.condition === "SALE" ? "Venta" : "Alquiler"}
    //     </p>
    //     <p
    //       className={clsx(
    //         styles.propertySpecifications,
    //         styles.marginPaddingPTag
    //       )}
    //     >
    //       {props.house.squareFoot} m² &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
    //       {props.house.rooms} hab. &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
    //       {props.house.fullBaths} {baths}
    //     </p>
    //     <Tooltip title={houseStreetNumber}>
    //       <p
    //         className={clsx(
    //           styles.propertyStreetNumber,
    //           styles.marginPaddingPTag
    //         )}
    //       >
    //         {houseStreetNumber}
    //       </p>
    //     </Tooltip>
    //     <Grid container>
    //       <Grid xs={11}>
    //         <p
    //           className={clsx(
    //             styles.propertyTownCity,
    //             styles.marginPaddingPTag
    //           )}
    //         >
    //           {houseAddress?.state ?? ""}, {houseAddress?.city ?? ""}
    //         </p>
    //       </Grid>
    //       <Grid xs>
    //         <Tooltip
    //           title={"Editar propiedad"}
    //           className={styles.propertyListEditPropertyTooltip}
    //         >
    //           <EditIcon
    //             // size={10}
    //             onClick={() =>
    //               history.push(urls.editProperty.byId(props.house.id))
    //             }
    //             className={styles.propertyListIcons}
    //           />
    //         </Tooltip>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Grid>
  );
}
