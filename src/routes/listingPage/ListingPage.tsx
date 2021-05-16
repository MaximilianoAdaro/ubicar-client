import styles from './ListingPage.module.scss'
import { Col, Container, Row } from "react-bootstrap";
import { ListingFilters } from "../../components/listingFilters";
import { ListingHouse } from "../../components/listingHouse";
import { useQuery } from "react-query";
import axios from "axios";


export function ListingPage() {


    const { data, status } = useQuery("propertyPreview", async () => {
        const { data } = await axios.get('/preview?page=0')
        return data;
    })

  return (
    <Container className={styles.listingPageContainer}>
        <ListingFilters/>
        <Row>
            <Col className={styles.listingPageCol}  id='RightPhoto' md={7}>
                Aca va el mapa
            </Col>
            <Col className={styles.listingPageCol} md={4}>
                {status =='error' && (
                    <h1>There was an error retrieving the properties</h1>
                )}
                {status == 'success' && (
                    data.content.map((casa: any) => (
                            <ListingHouse key={casa.id} house={casa}/>
                        )
                    )
                )}
            </Col>
        </Row>
    </Container>
  );
}
