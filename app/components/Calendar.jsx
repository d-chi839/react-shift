"use client";

import { DateTime } from "luxon";
import { Input } from "./Input";
import { useState } from "react";

export function Calendar() {
  const [inputedName, setInputName] = useState("");
  const [inputedStart, setInputStart] = useState("");
  const [inputedEnd, setInputEnd] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleAddData = (name, start, end) => {
    setInputName(name);
    setInputStart(start);
    setInputEnd(end);
    setShowInput(true);
  };

  const [inputDate, setInputDate] = useState("");
  const datePass = (day) => {
    setInputDate(day.date);
    setShowInput(true);
  };

  const [inputWeekDate, setInputWeekDate] = useState("");
  const weekDatePass = (thisWeek) => {
    setInputWeekDate(thisWeek.day);
  };

  const handleShowInput = (showInput) => {
    setShowInput(showInput);
  };

  // 表示切り替えのトグルスイッチ
  const [viewSwitch, setViewSwitch] = useState(true);
  const toggleView = () => {
    setViewSwitch((ViewSwitch) => !viewSwitch);
  };

  // カレンダー関係
  const date = DateTime.local();
  const currentYear = date.year; //現在の年を取得
  const currentMonth = date.toLocaleString({ month: "long" }); //現在の月を取得
  const startOfMonth = date.startOf("month"); //月初
  const endOfMonth = date.endOf("month"); //月終わり
  const startOfWeek = startOfMonth.startOf("week"); //月初の日にちを含めた週頭
  const endOfWeek = endOfMonth.endOf("week"); //月終わりを含めた週終わり

  // 月の配列を作成
  const days = [];
  let day = startOfWeek;

  while (day <= endOfWeek) {
    days.push({
      date: day.toFormat("yyyy年MM月dd日"),
      day: day.day,
    });
    day = day.plus({ day: 1 });
  }

  // 週の配列を作成
  const weeks = [];
  while (days.length > 0) {
    weeks.push(days.splice(0, 7));
  }

  // 今週の配列を作成
  const thisWeeks = [];
  let thisWeekStart = date.startOf("week");
  const thisWeekEnd = date.endOf("week");
  while (thisWeekStart <= thisWeekEnd) {
    thisWeeks.push(thisWeekStart);
    thisWeekStart = thisWeekStart.plus({ day: 1 });
  }

  // 曜日取得
  const weekDays = ["月", "火", "水", "木", "金", "土", "日"];

  return (
    <>
      <div>
        <div className="flex justify-between">
          <h2>
            <span className="mr-3">{currentMonth}</span>
            <span>{currentYear}</span>
          </h2>
          <div>
            <label>
              <input
                className="peer sr-only"
                id="view"
                onClick={toggleView}
                type="checkbox"
              ></input>
              <span
                className="block w-[2em] cursor-pointer bg-gray-500 rounded-full 
                p-[1px] after:block after:h-[1em] after:w-[1em] after:rounded-full 
                after:bg-white after:transition peer-checked:bg-blue-500 
                peer-checked:after:translate-x-[calc(100%-2px)]"
              />
            </label>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                {weekDays.map((weekDay) => {
                  return <th key={weekDay}>{weekDay}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {viewSwitch === true ? (
                <>
                  {weeks.map((week, index) => {
                    return (
                      <tr key={index}>
                        {week.map((day, index) => {
                          return (
                            <td
                              onClick={() => {
                                datePass(day);
                              }}
                              key={index}
                            >
                              {day.day}
                              {showInput && inputDate === day.date && (
                                <Input
                                  displayDate={inputDate}
                                  date={date}
                                  addData={handleAddData}
                                  show={handleShowInput}
                                  setShowInput={setShowInput}
                                />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <tr>
                    {thisWeeks.map((thisWeek, index) => {
                      return (
                        <td
                          onClick={() => {
                            weekDatePass(thisWeek);
                          }}
                          key={index}
                        >
                          {thisWeek.day}
                          {showInput && inputDate === day.date && (
                            <Input
                              displayDate={inputDate}
                              date={date}
                              addData={handleAddData}
                              show={handleShowInput}
                              setShowInput={handleShowInput}
                            />
                          )}
                          {inputedName && (
                            <>
                              <p>{inputedName}</p>
                              <p>{inputedStart}</p>
                              <p>{inputedEnd}</p>
                            </>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
