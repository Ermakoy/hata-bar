import React from 'react';
import { isPast, getDaysInMonth, format } from 'date-fns';
import { Button } from 'rendition';
import { enGB, eo, ru } from 'date-fns/locale';
import { TimelineContainer, Week, Month } from './timeline.css';

const BIRTH_DATE = new Date('1999-03-25');
const WEEKS_IN_YEAR = 52;
const WEEK = 1000 * 60 * 60 * 24 * 7;
const YEARS_I_THINK_I_WILL_LIVE = 65;

const getWeekNumberText = weekNumber =>
  `Номер недели: ${(weekNumber % 52) + 1}
Год: ${Math.trunc(weekNumber / 52)}`;
const startDay = new Date(2020, 9, 1);
const startYear = 2020;
const Timeline = props => {
  const data = [
    {
      date: new Date(),
      who: ['a', 'm'],
    },
  ];
  const now = new Date();
  const passedWeeks = (now - BIRTH_DATE) / WEEK;
  const months = Array.from({ length: 12 }).map((el, monthNumber) => {
    const daysCount = getDaysInMonth(new Date(startYear, monthNumber));
    return Array.from({ length: daysCount }).map(
      (day, daysNumber) =>
        console.log(daysNumber) || new Date(startYear, monthNumber, daysNumber)
    );
  });
  return (
    <>
      {months.map((month, monthNumber) => (
        <div style={{ display: 'flex' }}>
          <div style={{ width: 70 }}>
            {format(new Date(startYear, monthNumber), 'MMMM', { locale: ru })}
          </div>
          <Month daysNumber={month.length}>
            {month.map(day => (
              <Week Ermakoy={{}} Mark13={{}} passed={isPast(day)} />
            ))}
          </Month>
        </div>
      ))}
      <Button>Do stuff</Button>
    </>
  );
};

export default Timeline;
