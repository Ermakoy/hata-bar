import React, { useEffect, useState } from 'react';
import { isPast, getDaysInMonth, format, isSameDay } from 'date-fns';
import { Button } from 'rendition';
import { ru } from 'date-fns/locale';
import { Week, Month } from './timeline.css';
import firebase from 'gatsby-plugin-firebase';

import lazyApp from 'firebase/app';
import lazyDatabase from 'firebase/database';

import { getFirebase } from 'helpers/firebase';

const startYear = 2020;

const Timeline = () => {
  const months = Array.from({ length: 12 }).map((el, monthNumber) => {
    const daysCount = getDaysInMonth(new Date(startYear, monthNumber));
    return Array.from({ length: daysCount }).map(
      (day, daysNumber) => new Date(startYear, monthNumber, daysNumber)
    );
  });
  let onClickHandler;
  const [beerDrinkDays, setBeerDrinkDays] = useState([]);
  useEffect(() => {
    Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
      const database = firebase.database();
      const info = database.ref('beerDrinkDays');
      info.on('value', snapshot => {
        if (snapshot.val()) {
          setBeerDrinkDays(snapshot.val());
        }
      });
      onClickHandler = () => {
        const now = Date.now();
        beerDrinkDays.length > 0
          ? database.ref().update({ beerDrinkDays: [...beerDrinkDays, now] })
          : database.ref('beerDrinkDays').set([now]);
      };
    });
  }, []);
  console.log(beerDrinkDays);
  return (
    <>
      {months.map((month, monthNumber) => {
        const monthName = format(new Date(startYear, monthNumber), 'LLLL', {
          locale: ru,
        });
        return (
          <div>
            <span style={{ width: 70 }}>
              {monthName[0].toUpperCase().concat(monthName.slice(1))}
            </span>
            <Month daysNumber={month.length}>
              {month.map(day => (
                <Week
                  passed={beerDrinkDays.some(drinkDay =>
                    isSameDay(drinkDay, day)
                  )}
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
