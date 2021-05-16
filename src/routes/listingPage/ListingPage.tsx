import styles from './ListingPage.module.scss'
import { Col, Container, Row } from "react-bootstrap";
import { ListingFilters } from "../../components/listingFilters";
import { ListingHouse } from "../../components/listingHouse";
import { useQuery } from "react-query";


export function ListingPage() {

    const fetchPlanets = async () => {
        const res = await fetch('/preview?page=0');
        return res.json();
    }

    const { data, status } = useQuery("planets", fetchPlanets)

  return (
    <Container className={styles.listingPageContainer}>
        <ListingFilters/>
        <Row>
            <Col className={styles.listingPageCol}  id='RightPhoto' md={7}>
                Aca va el mapa
            </Col>
            <Col className={styles.listingPageCol} md={4}>
                {/*{status == 'loading' && (*/}
                {/*    <h1>isLoading</h1>*/}
                {/*)}*/}
                {/*{status =='error' && (*/}
                {/*    <h1>Error</h1>*/}
                {/*)}*/}
                {status == 'success' && (
                    data.content.map((casa: any) => (
                            <ListingHouse house={casa}/>
                        )
                    )
                )}
            </Col>
        </Row>
    </Container>
  );
}
