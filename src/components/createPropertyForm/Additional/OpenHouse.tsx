import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { SelectString } from "../../forms/SelectString";
import Calendar from "react-calendar";
import "./Calendar.scss";
import { useState } from "react";
// @ts-ignore
import TimePicker from "react-bootstrap-time-picker";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import { selectOpenHouses } from "../../../store/slices/createPropetyForm/createPropertyFormSlice";
import styles from "./Contacts.module.scss";
import { FiTrash2 } from "react-icons/all";

const hours = [
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
].map((value) => ({ name: value, value }));

export const OpenHouse = () => {
  const [initialTime, setInitialTime] = useState(hours[0].value);
  const [finalTime, setFinalTime] = useState(hours[0].value);
  const [day, setDay] = useState(new Date());
  const dispatch = useAppDispatch();
  const openHouseDates = useAppSelector(selectOpenHouses);

  const onAddHouseDate = async () => {
    if (openHouseDates.map((ohd) => ohd.day).includes(day)) {
      return;
    }
    dispatch(
      actions.createPropertyForm.addOpenHouse({ initialTime, finalTime, day })
    );
  };

  const onRemoveOpenHouseDate = (day: Date) => {
    dispatch(actions.createPropertyForm.removeOpenHouseDate(day));
  };

  return (
    <Container>
      <Row>
        <Col>
          <Calendar
            onChange={(date) => {
              if (date instanceof Date) setDay(date);
            }}
          />
        </Col>
        <Col>
          <Row>
            <SelectString
              name={"hours"}
              placeholder={"Desde"}
              options={hours}
              onSelect={(value) => setInitialTime(value)}
              // defaultValue={}
            />
          </Row>
          <br />
          <Row>
            <SelectString
              name={"hours"}
              placeholder={"Hasta"}
              options={hours}
              onSelect={(value) => setFinalTime(value)}
              // defaultValue={}
            />
          </Row>
          <Button
            onClick={onAddHouseDate}
            type="button"
            variant={"outline-dark"}
            className={styles.button}
          >
            +
          </Button>
        </Col>
      </Row>
      <Row className={styles.houseDatesCards}>
        <Col>
          {openHouseDates.map(({ initialTime, finalTime, day }) => (
            <Card className={styles.card}>
              <Card.Body className={styles.cardBody}>
                <div className={styles.cardLeft}>
                  <div>
                    <Card.Title>{day.toString().slice(0, 15)}</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Desde: {initialTime}
                    </Card.Subtitle>
                    <Card.Subtitle className="text-muted">
                      Hasta: {finalTime}
                    </Card.Subtitle>
                  </div>
                </div>
              </Card.Body>
              <div className={styles.deleteButtonContainer}>
                <FiTrash2 onClick={() => onRemoveOpenHouseDate(day)} />
              </div>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};
