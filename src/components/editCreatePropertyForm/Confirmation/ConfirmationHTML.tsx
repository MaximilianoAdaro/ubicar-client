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
import { PropertyCard } from "./PropertyCard";
import { photos } from "../../../routes/viewProperty/photos";

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
        <h5 className={styles.containers_subtitles}>Listado de propiedades</h5>
        <PropertyCard house={property} />
      </Grid>
      <Grid xs>
        <h5 className={styles.title}>Vista de propiedades</h5>
        <Grid className={styles.property_view_confirmation}>
          <Grid className={styles.photos_visualizer}>
            <div className={styles.mediaContainer}>
              <img src="https://timberhavenloghomes.com/wp-content/uploads/2017/07/Barth-Log-Home-Greatroom-1030x687.jpg" />
              <div>
                <img src="https://media.architecturaldigest.com/photos/58f7cf1a8bfbf566da78acc2/master/pass/IShvzncvwa127j0000000000.jpg" />
                <img src="https://shawhomes.com/wp-content/uploads/Exterior-Twilight-2-Shaw-Homes-12801-S.-Date-Street-Jenks-OK-Yorktown.jpg" />
                {/*<img src="https://www.maids.com/cleaning-hacks/wp-content/uploads/2018/01/Entire2-house-featured.jpg" />*/}
                <img src="https://media.architecturaldigest.com/photos/59382d7a3176b35c589a6af3/master/pass/adelman-house-frank-lloyd-wright-03.jpg" />
                <img src="https://cdn.architecturendesign.net/wp-content/uploads/2014/07/House-in-Gorki-08.jpg" />
                <img src="http://www.passivehousecanada.com/wp-content/uploads/2016/05/Alta-Lake-Passive-House-1024x637.jpg" />
                <img src="https://media.architecturaldigest.com/photos/59382d7a3176b35c589a6af3/master/pass/adelman-house-frank-lloyd-wright-03.jpg" />
              </div>
            </div>
          </Grid>
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
      </Grid>
    </Grid>
  );
};
