import { PropertyPreviewDTO } from "../../api";
import { Button, Grid, makeStyles } from "@material-ui/core";
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

export function PropertyList(props: ListingHouseProps) {
  const classes = useStyles();
  const house = props.house;
  const history = useHistory();
  const houseAddress = house.address;
  const houseStreetNumber = `${houseAddress.street} ${houseAddress.number}`;
  const baths = pluralize("baño", house.fullBaths);
  const toilets = pluralize("toilet", house.toilets);
  const specificationsTooltip = `${house.squareFoot} m²
   ${house.coveredSquareFoot} m² cubiertos 
   ${house.rooms} habitaciones
   ${house.fullBaths} ${baths}
   ${house.toilets} ${toilets}`;
  return (
    <div>
      <Grid className={styles.myPropertyOuterDiv}>
        <Grid container className={styles.container}>
          <Grid xs={3} xl={2}>
            <Image
              className={styles.myPropertiesImage}
              src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
              rounded
            />
          </Grid>
          <Grid xs={8} xl={9}>
            <Tooltip
              title={
                <Grid className={styles.userProfileToolTips}>
                  {house.title} | {house.type}
                </Grid>
              }
              classes={{ tooltip: classes.noMaxWidth }}
              placement="bottom-start"
            >
              <p className={styles.myPropertyTitle}>
                {house.title} &nbsp;|&nbsp; {house.type}
              </p>
            </Tooltip>
            <p className={styles.myPropertyPriceCondition}>
              En {house.condition == "SALE" ? "Venta" : "Alquiler"}{" "}
              &nbsp;|&nbsp; ${house.price.toLocaleString()}
            </p>
            <Tooltip
              title={
                <Grid className={styles.userProfileToolTips}>
                  {house.squareFoot}m² totales <br />
                  {house.coveredSquareFoot} m² cubiertos <br />
                  {house.rooms} habitaciones <br />
                  {house.fullBaths} {baths} <br />
                  {house.toilets} {toilets}
                </Grid>
              }
              classes={{ tooltip: classes.customWidth }}
              placement="bottom-start"
            >
              <p className={styles.myPropertySpecifications}>
                {house.squareFoot} m² totales &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
                {house.coveredSquareFoot} m² cubiertos &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
                {house.rooms} habitaciones &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
                {house.fullBaths} {baths} &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
                {house.toilets} {toilets}
              </p>
            </Tooltip>
            <p className={styles.myPropertyStreetNumber}>{houseStreetNumber}</p>
            <p className={styles.myPropertyTownCity}>
              {houseAddress.state}, {houseAddress.city}
            </p>
          </Grid>
          <Grid className={styles.editAndViewPropertyButtons}>
            <Grid xs>
              <Tooltip title={"Ver propiedad"}>
                <VisibilityIcon
                  onClick={() => history.push(urls.viewProperty.byId(house.id))}
                  className={styles.propertyListIcons}
                />
              </Tooltip>
            </Grid>
            <Grid xs>
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
