import styles from "./ListingPage.module.scss";
import {
  Col,
  Container,
  Image,
  Row,
  Button,
  DropdownButton,
  Dropdown,
  Form,
} from "react-bootstrap";

export function ListingPage() {
  return (
    <Container className={styles.listingPageContainer}>
      <Row>
        <DropdownButton
          title="For Sale"
          variant="dark"
          className={styles.dropdownButtons}
        >
          <Dropdown.Item href="#/action-1">En Venta</Dropdown.Item>
          <Dropdown.Item href="#/action-2">En Alquiler</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          title="Price"
          variant="dark"
          className={styles.dropdownButtons}
        >
          <Dropdown.Item href="#/action-1">Orden ascendente</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Orden descendente</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          title="Estilo"
          variant="dark"
          className={styles.dropdownButtons}
        >
          <Dropdown.Item href="#/action-1">Colonial</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Clasico</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          title="Numero de habitaciones"
          variant="dark"
          className={styles.dropdownButtons}
        >
          <Form>
            <Button variant="light">1</Button>
            <Button variant="light">2</Button>
            <Button variant="light">3</Button>
            <Button variant="light">4</Button>
            <Button variant="light">5+</Button>
          </Form>
        </DropdownButton>
        <DropdownButton
          title="Numero de baños"
          variant="dark"
          className={styles.dropdownButtons}
        >
          <Form>
            <Button variant="light">1</Button>
            <Button variant="light">2</Button>
            <Button variant="light">3</Button>
            <Button variant="light">4+</Button>
          </Form>
        </DropdownButton>
        <DropdownButton
          title="Jardin"
          variant="dark"
          className={styles.dropdownButtons}
        >
          <Dropdown.Item href="#/action-1">Si</Dropdown.Item>
          <Dropdown.Item href="#/action-2">No</Dropdown.Item>
        </DropdownButton>
      </Row>
      <Row>
        <Col className={styles.listingPageCol} id="RightPhoto" md={7}>
          {/*Mapa de prueba para que no quede vacia la parte izquierda*/}
          <Image
            className={styles.mapImage}
            src="https://www.geographicguide.com/pictures/argentina-map.jpg"
          />
        </Col>
        <Col className={styles.listingPageCol} md={4}>
          {/*Obviamente esto va a ser un for, o un map, pero puse varios para probar como se veian*/}
          <Row className={styles.propertyInformation}>
            <Col className={styles.propertyImageCol}>
              <Image
                className={styles.propertiesImages}
                src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
                rounded
              />
            </Col>
            <Col className={styles.propertyTechnicalInformation}>
              <Row className={styles.propertyCharacteristics}>- Venta</Row>
              <Row className={styles.propertyCharacteristics}>
                - $40.000.000
              </Row>
              <Row className={styles.propertyCharacteristics}>
                - 4 habitaciones / 3 baños
              </Row>
              <Row className={styles.propertyCharacteristics}>- 350 m²</Row>
              <Row className={styles.propertyCharacteristics}>
                - 2446 Highway Z, Wetzville, MO 63385
              </Row>
            </Col>
          </Row>
          <Row className={styles.propertyInformation}>
            <Col className={styles.propertyImageCol}>
              <Image
                className={styles.propertiesImages}
                src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
                rounded
              />
            </Col>
            <Col className={styles.propertyTechnicalInformation}>
              <Row className={styles.propertyCharacteristics}>- Venta</Row>
              <Row className={styles.propertyCharacteristics}>
                - $40.000.000
              </Row>
              <Row className={styles.propertyCharacteristics}>
                - 4 habitaciones / 3 baños
              </Row>
              <Row className={styles.propertyCharacteristics}>- 350 m²</Row>
              <Row className={styles.propertyCharacteristics}>
                - 2446 Highway Z, Wetzville, MO 63385
              </Row>
            </Col>
          </Row>
          <Row className={styles.propertyInformation}>
            <Col className={styles.propertyImageCol}>
              <Image
                className={styles.propertiesImages}
                src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
                rounded
              />
            </Col>
            <Col className={styles.propertyTechnicalInformation}>
              <Row className={styles.propertyCharacteristics}>- Venta</Row>
              <Row className={styles.propertyCharacteristics}>
                - $40.000.000
              </Row>
              <Row className={styles.propertyCharacteristics}>
                - 4 habitaciones / 3 baños
              </Row>
              <Row className={styles.propertyCharacteristics}>- 350 m²</Row>
              <Row className={styles.propertyCharacteristics}>
                - 2446 Highway Z, Wetzville, MO 63385
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
