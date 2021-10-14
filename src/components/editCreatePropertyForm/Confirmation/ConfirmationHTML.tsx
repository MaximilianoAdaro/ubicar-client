import { Container } from "react-bootstrap";
import styles from "./Confirmation.module.scss";
import { StepButtons } from "../StepButtons/StepButtons";
import { ListingHouse } from "../../listingHouse";
import { PropertyDTO } from "../../../api";
import { Grid } from "@material-ui/core";
import React, { ReactNode } from "react";
import { FcHome } from "react-icons/all";
import surfaceIcon from "../../../assets/surfaceIcon.png";
import pluralize from "pluralize";
import bathroomIcon from "../../../assets/bathroomIcon.svg";
import toiletIcon from "../../../assets/toiletIcon.svg";
import roomIcon from "../../../assets/roomIcon.svg";

type ConfirmationHTMLProps = {
  handleSend: () => void;
  handlePrevious: () => void;
  property?: PropertyDTO;
};

export const ConfirmationHTML = ({
  handleSend,
  handlePrevious,
  property,
}: ConfirmationHTMLProps) => {
  return (
    <Grid className={styles.container}>
      {property && <Preview property={property} />}
      <div className={styles.buttons}>
        <StepButtons onNext={handleSend} onPrevious={handlePrevious} />
      </div>
    </Grid>
  );
};

type PreviewProps = {
  property: PropertyDTO;
};

const makeFact = (
  keyWord: string,
  value: string,
  left: boolean,
  icon?: ReactNode
) => (
  <div className={styles.factContainer}>
    <div className={styles.factIcon}>{icon}</div>
    <div>
      {left && <span className={styles.factKeyWord}>{keyWord}</span>}
      {left && " "}
      <span className={styles.factValue}>{value}</span>{" "}
      {!left && <span className={styles.factKeyWord}>{keyWord}</span>}
    </div>
  </div>
);

export const Preview = ({ property }: PreviewProps) => {
  return (
    <Grid container>
      <h3 style={{ width: "100%" }}>Previsualizar</h3>
      <Grid xs={3}>
        <h5>Listado de propiedades</h5>
        <ListingHouse house={property} clickable={false} />
      </Grid>
      <Grid xs className={styles.property_view_confirmation}>
        <h5>Vista de propiedades</h5>
        <Grid className={styles.photos_visualizer}>Photos</Grid>
        <Grid>
          <h2>{property.title}</h2>
        </Grid>
        <Grid className={styles.facts}>
          {makeFact(
            "Total",
            `${property.squareFoot}m²`,
            false,
            <img src={surfaceIcon} alt="surface icon" />
          )}
          {makeFact(
            "Cubierta",
            `${property.coveredSquareFoot}m²`,
            false,
            <img src={surfaceIcon} alt="surface icon" />
          )}
          {makeFact(
            pluralize("Ambiente", property.environments),
            `${property.environments}`,
            false,
            <img src={roomIcon} alt="toilet icon" />
          )}
          {makeFact(
            pluralize("Baño", property.fullBaths),
            `${property.fullBaths}`,
            false,
            <img src={bathroomIcon} alt="bathroom icon" />
          )}
          {makeFact(
            pluralize("Toilets", property.toilets),
            `${property.toilets}`,
            false,
            <img src={toiletIcon} alt="toilet icon" />
          )}
          {makeFact(
            pluralize("Cuarto", property.rooms),
            `${property.rooms}`,
            false,
            <img src={roomIcon} alt="toilet icon" />
          )}
        </Grid>
        <Grid>
          <span>{property.comments}</span>
        </Grid>
      </Grid>
      {/*<div className={styles.container}>*/}
      {/*  <h4>Preview</h4>*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      // width: "70%",*/}
      {/*      display: "flex",*/}
      {/*      justifyContent: "center",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: "80%",*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      /!*<ListingHouse house={property} clickable={false} />*!/*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </Grid>
  );
};
