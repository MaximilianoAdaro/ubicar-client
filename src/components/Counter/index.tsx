import { useAppDispatch, useAppSelector } from "../../store";
import { actions } from "../../slices/actions";
import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import styles from "./Counter.module.scss";

export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [inputCount, setInputCount] = useState("");

  return (
    <div className={styles.counter}>
      <Button onClick={() => dispatch(actions.counter.decrement())}>-</Button>
      <span>Count: {count}</span>
      <Button onClick={() => dispatch(actions.counter.increment())}>+</Button>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const number = Number(inputCount) || 0; // if not number, default to zero
          dispatch(actions.counter.incrementByAmount(number));
        }}
      >
        <Row>
          <Form.Control
            value={inputCount}
            onChange={(e) => {
              setInputCount(e.target.value);
            }}
          />
          <Button type={"submit"}>Agregar</Button>
        </Row>
      </form>
    </div>
  );
}
