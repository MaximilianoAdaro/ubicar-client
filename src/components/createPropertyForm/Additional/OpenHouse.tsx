import { Col, Container, Row } from "react-bootstrap";
import { SelectString } from "../../forms/SelectString";
import Calendar from "react-calendar";
import "./Calendar.scss";
import { useState } from "react";

const hours = [
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
].map((value) => ({ name: value, value }));

export const OpenHouse = () => {
  const [from, setFrom] = useState(hours[0].value);
  const [to, setTo] = useState(hours[0].value);
  const [date, setDate] = useState(new Date());

  console.log({
    from,
    to,
    date,
  });

  return (
    <Container>
      <Row>
        <Col>
          <Calendar
            onChange={(date) => {
              if (date instanceof Date) setDate(date);
            }}
          />
        </Col>
        <Col>
          <Row>
            <SelectString
              name={"hours"}
              placeholder={"Desde"}
              options={hours}
              onSelect={(value) => setFrom(value)}
              // defaultValue={}
            />
          </Row>
          <br />
          <Row>
            <SelectString
              name={"hours"}
              placeholder={"Hasta"}
              options={hours}
              onSelect={(value) => setTo(value)}
              // defaultValue={}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
