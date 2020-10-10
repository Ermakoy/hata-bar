import React from 'react';
import { isPast, getDaysInMonth, format } from 'date-fns';
import { Button } from 'rendition';
import { ru } from 'date-fns/locale';
import { Week, Month } from './timeline.css';
import firebase from 'gatsby-plugin-firebase';

const startYear = 2020;

const Timeline = () => {
  const months = Array.from({ length: 12 }).map((el, monthNumber) => {
    const daysCount = getDaysInMonth(new Date(startYear, monthNumber));
    return Array.from({ length: daysCount }).map(
      (day, daysNumber) => new Date(startYear, monthNumber, daysNumber)
    );
  });
  const database = firebase.database();
  const info = database.ref('beerDrinkDays');
  let beerDrinkDays = [];

  info.on('value', snapshot => {
    if (snapshot.val()) {
      beerDrinkDays = snapshot.val()
    }
  });

  const onClickHandler = () => {
    const now = Date.now();
    beerDrinkDays.length > 0
      ? database.ref().update({'beerDrinkDays': [...beerDrinkDays, now]})
      : database.ref('beerDrinkDays').set([now]);
  }

  return (
    <>
      {
        months.map((month, monthNumber) => {
          const monthName = format(new Date(startYear, monthNumber), 'LLLL', { locale: ru });
          return (
            <div style={{ display: 'flex' }}>
              <div style={{ width: 70 }}>
                {monthName.slice(0, 1).toUpperCase() + monthName.slice(1)}
              </div>
              <Month daysNumber={month.length}>
                {month.map(day => (
                  <Week passed={isPast(day)} />
                ))}
              </Month>
            </div>
          )
        })
      }
      <Button onClick={onClickHandler}>Do stuff</Button>
    </>
  );
};

export default Timeline;
