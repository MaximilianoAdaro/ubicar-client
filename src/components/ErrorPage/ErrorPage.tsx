import styles from "./ErrorPage.module.scss";
import { Container } from "react-bootstrap";

const ErrorPage = () => (
  <Container>
    <h1 className={styles.header}>An error has occured</h1>
  </Container>
);

export default ErrorPage;
