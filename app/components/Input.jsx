import { useState } from "react";

export function Input(props) {
  const starts = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const ends = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  const [name, setName] = useState("");
  const [start, setStart] = useState(starts[0]);
  const [end, setEnd] = useState(ends[0]);

  const addData = () => {
    props.addData(name, start, end);
    setName("");
    setStart(starts[0]);
    setEnd(ends[0]);
    setShowInput = { setShowInput };
  };

  const closeInput = () => {
    setName("");
    setStart(starts[0]);
    setEnd(ends[0]);
    setShowInput = { setShowInput };
  };

  return (
    <>
      {props.show && (
        <div>
          <h2>{props.displayDate}</h2>
          <div>
            <label>名前：</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
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
            <button onClick={addData}>追加</button>
            <button onClick={closeInput}>戻る</button>
          </div>
        </div>
      )}
    </>
  );
}
