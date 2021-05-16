import { Col, Container, Row } from "react-bootstrap";
import { SelectString } from "../../forms/SelectString";
import Calendar from "react-calendar";

const hours = [
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
].map((value) => ({ name: value, value }));

export const OpenHouse = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Calendar />
        </Col>
        <Col>
          <Row>
            <SelectString
              name={"hours"}
              placeholder={"Desde"}
              options={hours}
              onSelect={() => {}}
              // defaultValue={}
            />
          </Row>
          <br />
          <Row>
            <SelectString
              name={"hours"}
              placeholder={"Hasta"}
              options={hours}
              onSelect={() => {}}
              // defaultValue={}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
