import { Button, Card, Col, Row } from "react-bootstrap";
import "./Calendar.scss";
import React, { useState } from "react";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import { selectOpenHouses } from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import { FiTrash2 } from "react-icons/all";
import styles from "./OpenHouse.module.scss";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Grid } from "@material-ui/core";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const printDate = (date: Date) => {
  return (
    date.getDate() +
    " de " +
    months[date.getMonth()] +
    " de " +
    date.getFullYear()
  );
};

export const OpenHouse = () => {
  const [selectedDate, handleDateChange] = useState<Date | null>(new Date());
  const [fromTime, handleFromTime] = useState<Date | null>(new Date());
  const [toTime, handleToTime] = useState<Date | null>(new Date());

  const dispatch = useAppDispatch();
  const openHouseDates = useAppSelector(selectOpenHouses);
  const onAddHouseDate = async () => {
    const initialTime = `${fromTime?.getHours()}:${fromTime
      ?.toString()
      .slice(19, 21)}`;
    const finalTime = `${toTime?.getHours()}:${toTime
      ?.toString()
      .slice(19, 21)}`;

    if (
      openHouseDates.find(
        (openHouse) => openHouse.day === selectedDate?.toString().slice(0, 15)
      )
    ) {
      return;
    }
    if (selectedDate && fromTime && toTime) {
      if (toTime < fromTime) {
        return;
      }
      dispatch(
        actions.editPropertyForm.addOpenHouse({
          initialTime,
          finalTime,
          day: selectedDate?.toString().slice(0, 15),
        })
      );
    }
  };

  const onRemoveOpenHouseDate = (
    day: string,
    initialTime: string,
    finalTime: string
  ) => {
    dispatch(
      actions.editPropertyForm.removeOpenHouseDate({
        day,
        initialTime,
        finalTime,
      })
    );
  };

  return (
    <Grid className={styles.open_house_container}>
      <div className={styles.titleContainer}>
        <h4>Open House</h4>
      </div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <span>Dia de la visita</span>
        <br />
        <span style={{ fontSize: "small" }}>Se pueden agregar mas que uno</span>
        <br />
        <DatePicker
          value={selectedDate}
          style={{ width: "60%" }}
          onChange={handleDateChange}
        />
        <br />
        <br />
        <span style={{ marginTop: "1em" }}>Desde que hora:</span>
        <br />
        <TimePicker
          value={fromTime}
          style={{ width: "60%" }}
          onChange={handleFromTime}
        />
        <br />
        <br />
        <span>Hasta que hora:</span>
        <br />
        <TimePicker
          value={toTime}
          style={{ width: "60%" }}
          onChange={handleToTime}
        />
      </MuiPickersUtilsProvider>
      <br />

      <Button
        onClick={onAddHouseDate}
        type="button"
        variant={"outline-dark"}
        className={styles.button}
      >
        Agregar
      </Button>
      <Row className={styles.cardsContainer}>
        <Col>
          {openHouseDates.map(({ initialTime, finalTime, day }) => (
            <Card key={day + initialTime + finalTime} className={styles.card}>
              <Card.Body className={styles.cardBody}>
                <div>
                  <Card.Title>{printDate(new Date(day))}</Card.Title>
                  <Card.Subtitle className="text-muted">
                    Desde {initialTime} hasta {finalTime}
                  </Card.Subtitle>
                </div>
              </Card.Body>
              <div className={styles.deleteButtonContainer}>
                <FiTrash2
                  onClick={() =>
                    onRemoveOpenHouseDate(day, initialTime, finalTime)
                  }
                />
              </div>
            </Card>
          ))}
        </Col>
      </Row>
    </Grid>
  );
};
