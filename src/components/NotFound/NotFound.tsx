import styles from "./NotFound.module.scss";
import { Container } from "react-bootstrap";

export const NotFound = () => (
  <Container>
    <h1 className={styles.header}>La pagina no existe</h1>
  </Container>
);
