import { useState } from "react";
import classes from "./Input.module.css";

export function Input(props) {
  const starts = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const ends = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  const [inputData, setInputData] = useState([
    { name: "", start: "", end: "" },
  ]);

  const handleInputChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    props.onData(inputData);
    props.inputView();
    setInputData({ name: "", start: "", end: "" });
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
            name="name"
            type="text"
            value={inputData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.input__time}>
          <label>勤務時間：</label>
          <select
            name="start"
            id="time"
            value={inputData.start}
            onChange={handleInputChange}
          >
            <option value="">選択してください</option>
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
            value={inputData.end}
            onChange={handleInputChange}
          >
            <option value="">選択してください</option>
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
          <button className={classes.btn__add} onClick={handleSubmit}>
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
