import { PropertyPreviewDTO } from "../../api";
import { Button, Grid } from "@material-ui/core";
import { Image } from "react-bootstrap";
import styles from "./UserProfile.module.scss";
import { useHistory } from "react-router-dom";
import pluralize from "pluralize";
import { urls } from "../../constants";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";

interface ListingHouseProps {
  house: PropertyPreviewDTO;
  from: string;
}

export function PropertyList(props: ListingHouseProps) {
  const house = props.house;
  const history = useHistory();
  const houseAddress = house.address;
  const houseStreetNumber = `${houseAddress.street} ${houseAddress.number}`;
  const baths = pluralize("baño", house.fullBaths);
  return (
    <div>
      <Grid className={styles.myPropertyOuterDiv}>
        <Grid container className={styles.container}>
          <Grid xs={4} xl={3}>
            <Image
              className={styles.myPropertiesImage}
              src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
              rounded
            />
          </Grid>
          <Grid xs={8} xl={9}>
            <p className={styles.myPropertyTitle}>
              {house.title} &nbsp;|&nbsp; {house.type}
            </p>
            <p className={styles.myPropertyPriceCondition}>
              En {house.condition == "SALE" ? "Venta" : "Alquiler"}{" "}
              &nbsp;|&nbsp; ${house.price.toLocaleString()}
            </p>
            <p className={styles.myPropertySpecifications}>
              {house.squareFoot} m² &nbsp; totales &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
              {house.coveredSquareFoot} m² &nbsp; cubiertos
              &nbsp;&nbsp;|&nbsp;&nbsp; {house.rooms} habitaciones
              &nbsp;&nbsp;|&nbsp;&nbsp; {house.fullBaths} {baths}{" "}
              &nbsp;&nbsp;|&nbsp;&nbsp; {house.toilets} toilets
            </p>
            <p className={styles.myPropertyStreetNumber}>{houseStreetNumber}</p>
            <p className={styles.myPropertyTownCity}>
              {houseAddress.state}, {houseAddress.city}
            </p>
            <Grid className={styles.editAndViewPropertyButtons}>
              {props.from === "properties" && (
                <Tooltip
                  title={"Editar propiedad"}
                  className={styles.propertyListEditPropertyTooltip}
                >
                  <EditIcon
                    onClick={() =>
                      history.push(urls.editProperty.byId(house.id))
                    }
                    className={styles.propertyListIcons}
                  />
                </Tooltip>
              )}
              <Tooltip title={"Ver propiedad"}>
                <VisibilityIcon
                  onClick={() => history.push(urls.viewProperty.byId(house.id))}
                  className={styles.propertyListIcons}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
