"use client";

import classes from "./Calendar.module.css";
import { DateTime } from "luxon";
import { Input } from "../Input";
import { useState } from "react";
import { DataDisplay } from "../DataDisplay";

export function Calendar() {
  // tdをクリックしたときにinputDateに日付を入れる処理
  const [inputDate, setInputDate] = useState(null);
  const datePass = (day) => {
    setInputDate(day.date);
    if (!isShow) {
      inputView();
    }
  };

  // 子コンポーネントからデータを受け取る
  const [data, setData] = useState([]);
  const handleData = (childData) => {
    setData((prevData) => [...prevData, childData]);
  };

  // 表示切り替えのトグルスイッチ
  const [viewSwitch, setViewSwitch] = useState(true);
  const toggleView = () => setViewSwitch(!viewSwitch);

  // Inputコンポーネントの表示切り替え
  const [isShow, setIsShow] = useState(false);
  const inputView = () => {
    setIsShow((inputView) => !inputView);
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
    thisWeeks.push({
      date: thisWeekStart.toFormat("yyyy年MM月dd日"),
      day: thisWeekStart.day,
    });
    thisWeekStart = thisWeekStart.plus({ day: 1 });
  }

  // 曜日取得
  const weekDays = ["月", "火", "水", "木", "金", "土", "日"];

  return (
    <>
      <div className={classes.calendar}>
        <div className={classes.calendar__head}>
          <h2>
            <span className="mr-3">{currentMonth}</span>
            <span>{currentYear}</span>
          </h2>
          <div className={classes.switchArea}>
            <input onClick={toggleView} type="checkbox" id="view" />
            <label htmlFor="view">
              <span></span>
            </label>
            <div className={classes.swImg}></div>
          </div>
        </div>
        <div className={classes.calendar__body}>
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
                              <div className={classes.td__inner}>
                                <span className={classes.calendar__date}>
                                  {day.day}
                                </span>
                                {inputDate == day.date && (
                                  <DataDisplay data={data} />
                                )}
                              </div>
                              {isShow && inputDate == day.date && (
                                <Input
                                  date={day.date}
                                  inputView={inputView}
                                  onData={handleData}
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
                            datePass(thisWeek);
                          }}
                          key={index}
                        >
                          <div className={classes.td__inner}>
                            <span className={classes.calendar__date}>
                              {thisWeek.day}
                            </span>
                            {inputDate == thisWeek.date && (
                              <DataDisplay data={data} />
                            )}
                          </div>
                          {isShow && inputDate == thisWeek.date && (
                            <Input
                              date={thisWeek.date}
                              inputView={inputView}
                              onData={handleData}
                            />
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
