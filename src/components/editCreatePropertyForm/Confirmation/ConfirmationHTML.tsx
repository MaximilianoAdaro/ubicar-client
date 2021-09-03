import { Container } from "react-bootstrap";
import styles from "./Confirmation.module.scss";
import { StepButtons } from "../StepButtons/StepButtons";
import { ListingHouse } from "../../listingHouse";
import { PropertyDTO } from "../../../api";

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
    <Container>
      {property && <Preview property={property} />}
      <div className={styles.buttons}>
        <StepButtons onNext={handleSend} onPrevious={handlePrevious} />
      </div>
    </Container>
  );
};

type PreviewProps = {
  property: PropertyDTO;
};

export const Preview = ({ property }: PreviewProps) => {
  return (
    <div>
      <div className={styles.container}>
        <h4>Preview</h4>
        <div
          style={{
            // width: "70%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "80%",
            }}
          >
            <ListingHouse house={property} clickable={false} />
          </div>
        </div>
      </div>
    </div>
  );
};
