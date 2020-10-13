import React, { useCallback, useEffect, useState, useMemo } from "react";
import { getDaysInMonth, format, isSameDay } from "date-fns";
import firebase from "gatsby-plugin-firebase";
import { useObjectVal } from "react-firebase-hooks/database";
import { Button } from "rendition";
import { ru } from "date-fns/locale";
import { Week, Month } from "./timeline.css";

const startYear = 2020;

const Timeline = () => {
  const months = useMemo(
    () =>
      Array.from({ length: 12 }).map((el, monthNumber) => {
        const daysCount = getDaysInMonth(new Date(startYear, monthNumber));
        return Array.from({ length: daysCount }).map(
          (day, daysNumber) => new Date(startYear, monthNumber, daysNumber)
        );
      }),
    []
  );
  const [beerDrinkDays, setBeerDrinkDays] = useState([]);
  const [data, isLoading] = useObjectVal(
    firebase.database().ref("beerDrinkDays")
  );
  console.log({ data, isLoading });
  const database = useMemo(() => firebase && firebase.database(), [firebase]);
  useEffect(() => {
    if (database) {
      data.on("value", ({ val }) => val() && setBeerDrinkDays(val()));
    }
  }, [database, data]);

  const onClickHandler = useCallback(() => {
    const now = Date.now();

    if (database && !beerDrinkDays.some(day => isSameDay(day, now))) {
      beerDrinkDays.length > 0
        ? database.ref().update({ beerDrinkDays: [...beerDrinkDays, now] })
        : database.ref("beerDrinkDays").set([now]);
    }
  }, [database, beerDrinkDays]);

  console.log(beerDrinkDays);
  return (
    <>
      {months.map((month, monthNumber) => {
        const monthName = format(new Date(startYear, monthNumber), "LLLL", {
          locale: ru
        });
        return (
          <div key={monthNumber}>
            <span style={{ width: 70 }}>
              {monthName[0].toUpperCase().concat(monthName.slice(1))}
            </span>
            <Month daysNumber={month.length}>
              {month.map((day, index) => (
                <Week
                  passed={beerDrinkDays.some(drinkDay =>
                    isSameDay(drinkDay, day)
                  )}
                  key={index}
                />
              ))}
            </Month>
          </div>
        );
      })}
      <Button onClick={onClickHandler}>Do stuff</Button>
    </>
  );
};

export default Timeline;
