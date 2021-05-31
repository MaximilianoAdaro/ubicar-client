import styles from "./ErrorPage.module.scss";
import { Container } from "react-bootstrap";

const ErrorPage = () => (
  <Container>
    <h1 className={styles.header}>Hubo un error</h1>
  </Container>
);

export default ErrorPage;
