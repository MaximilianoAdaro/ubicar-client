import { Container } from "react-bootstrap";
import styles from "./Confirmation.module.scss";
import { StepButtons } from "../StepButtons/StepButtons";

type confirmationHTMLProps = {
  handleSend: () => void;
  handlePrevious: () => void;
};

export const ConfirmationHTML = ({
  handleSend,
  handlePrevious,
}: confirmationHTMLProps) => {
  return (
    <Container>
      <Preview />
      <div className={styles.buttons}>
        <StepButtons onNext={handleSend} onPrevious={handlePrevious} />
      </div>
    </Container>
  );
};

export const Preview = () => {
  return (
    <div>
      <div className={styles.container}>
        <h4>Preview</h4>
        <div className={styles.comingSoon}>
          <h3>Proximamente...</h3>
        </div>
      </div>
    </div>
  );
};
