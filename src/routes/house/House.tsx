import styles from './House.module.scss'
import {Col, Image, Row} from "react-bootstrap";
import React from 'react'


export function House(props:any) {

  return (
        <a href='https://google.com/' className={styles.aTagHref}>
            <Row className={styles.propertyInformation}>
                <Col className={styles.propertyImageCol}>
                    <Image className={styles.propertiesImages} src='https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg' rounded/>
                </Col>
                <Col className={styles.propertyTechnicalInformation}>
                    <Row className={styles.propertyCharacteristics}>
                         {props.house.title}
                    </Row>
                    <Row className={styles.propertyCharacteristics}>
                        USD {props.house.price.toLocaleString()}
                    </Row>
                    <Row className={styles.propertyCharacteristics}>
                        {props.house.type} en {props.house.sale} - {props.house.size} m²
                    </Row>
                    <Row className={styles.propertyCharacteristics}>
                        {props.house.habs} habitaciones  - {props.house.baths} baños
                    </Row>
                    <Row className={styles.propertyCharacteristics}>
                        {props.house.dir}
                    </Row>
                </Col>
            </Row>
        </a>
  );
}
