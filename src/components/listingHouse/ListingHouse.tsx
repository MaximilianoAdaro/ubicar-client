import styles from './ListingHouse.module.scss'
import {Col, Image, Row} from "react-bootstrap";
import React from 'react'


export function ListingHouse(props:any) {

    const toLowerCaseExceptFirst = (data:string) => {
        return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
    }
    const house = props.house
    const houseAddress = house.address
    const address = `${houseAddress.street} ${houseAddress.number}, ${houseAddress.town.name}, ${houseAddress.town.city.name}, ${houseAddress.postalCode}`

  return (
        <a href='https://google.com/' className={styles.aTagHref}>
            <Row className={styles.propertyInformation}>
                <Col className={styles.propertyImageCol}>
                    <Image className={styles.propertiesImages} src='https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg' rounded/>
                </Col>
                <Col className={styles.propertyTechnicalInformation}>
                    <Row className={styles.propertyCharacteristics}>
                         {house.title}
                    </Row>
                    <Row className={styles.propertyCharacteristics}>
                        USD {house.price.toLocaleString()}
                    </Row>
                    <Row className={styles.propertyCharacteristics}>
                        {toLowerCaseExceptFirst(house.type)} in {toLowerCaseExceptFirst(house.condition)} - {house.squareFoot} m²
                    </Row>
                    <Row className={styles.propertyCharacteristics}>
                        {house.rooms} habitaciones  - {house.fullBaths} baños
                    </Row>
                    <Row className={styles.propertyCharacteristics}>
                        {address}
                    </Row>
                </Col>
            </Row>
        </a>
  );
}
