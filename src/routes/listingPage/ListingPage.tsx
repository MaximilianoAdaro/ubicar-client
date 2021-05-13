import styles from './ListingPage.module.scss'
import { Col, Container, Row } from "react-bootstrap";
import {ListingFilters} from "../listingFilters";
import {House} from "../house";


const casa = {
    title:'Departamento en Belgrano, gran ubicacion',
    price: 4000000,
    dir: '2446 Highway Z, Wetzville, MO 63385',
    type: 'Departamento',
    habs: 4,
    baths: 3,
    size: 750,
    sale: 'Venta'
}
const casa2 = {
    title:'Casa en Nordelta, lote al lago',
    price: 200000,
    dir: '2500 Highway Z, Wetzville, MO 63385',
    type: 'Casa',
    habs: 5,
    baths: 2,
    size: 475,
    sale: 'Alquiler'
}
const casa3 = {
    title:'Casa en Pilar, con parque y parilla',
    price: 650000,
    dir: '1600 Calle X, Ciudad, CD 64403',
    type: 'Casa',
    habs: 7,
    baths: 5,
    size: 1000,
    sale: 'Venta'
}
const casa4 = {
    title:'Casa en Belgrano, gran ubicacion',
    price: 650000,
    dir: '1600 Calle X, Ciudad, CD 64403',
    type: 'Departamento',
    habs: 7,
    baths: 5,
    size: 1000,
    sale: 'Venta'
}
const casa5 = {
    title:'Casa en Belgrano, gran ubicacion',
    price: 650000,
    dir: '1600 Calle X, Ciudad, CD 64403',
    type: 'Casa',
    habs: 7,
    baths: 5,
    size: 1000,
    sale: 'Venta'
}
const casa6 = {
    title:'Casa en Belgrano, gran ubicacion',
    price: 650000,
    dir: '1600 Calle X, Ciudad, CD 64403',
    type: 'Casa',
    habs: 7,
    baths: 5,
    size: 1000,
    sale: 'Venta'
}

const casas = [casa,casa2,casa3,casa4,casa5,casa6]
export function ListingPage() {
  return (

    <Container className={styles.listingPageContainer}>
        <ListingFilters/>
        <Row>
            <Col className={styles.listingPageCol}  id='RightPhoto' md={7}>
                Aca va el mapa
            </Col>
            <Col className={styles.listingPageCol} md={4}>
                {
                    casas.map(casa => (
                        <House house={casa}/>
                        )
                    )
                }
            </Col>
        </Row>
    </Container>
  );
}
