import { useState } from "react";
import classes from "./Input.module.css";

export function Input(props) {
  const starts = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const ends = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  const [name, setName] = useState("");
  const [start, setStart] = useState(starts[0]);
  const [end, setEnd] = useState(ends[0]);

  const addData = () => {
    props.inputView();
  };

  const closeInput = () => {
    props.inputView();
  };

  return (
    <div className={classes.input}>
      <div className={classes.input__inner}>
        <h2 className={classes.input__title}>{props.date}</h2>
        <div className={classes.input__name}>
          <label>名前：</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={classes.input__time}>
          <label>勤務時間：</label>
          <select
            name="start"
            id="time"
            value={start}
            onChange={(e) => setStart(parseInt(e.target.value))}
          >
            {starts.map((start, index) => {
              return (
                <option key={index} value={start}>
                  {start}
                </option>
              );
            })}
          </select>
          {" 〜 "}
          <select
            name="end"
            id="time"
            value={end}
            onChange={(e) => setEnd(parseInt(e.target.value))}
          >
            {ends.map((end, index) => {
              return (
                <option key={index} value={end}>
                  {end}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <button className={classes.btn__add} onClick={addData}>
            追加
          </button>
          <button className={classes.btn__close} onClick={closeInput}>
            戻る
          </button>
        </div>
      </div>
    </div>
  );
}
