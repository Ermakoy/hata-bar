import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { getDaysInMonth, format, isSameDay } from 'date-fns';
import firebase from 'gatsby-plugin-firebase';
import { useObjectVal } from 'react-firebase-hooks/database';
import { Button, Tooltip, Txt, Box } from 'rendition';
import { ru } from 'date-fns/locale';
import { Week, Month } from './timeline.css';

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
  const [beerDrinkDays, isLoading] = useObjectVal(
    firebase.database().ref('beerDrinkDays')
  );
  const database = useMemo(() => firebase?.database(), [firebase]);
  const ref = useMemo(() => database?.ref('beerDrinkDays'), [database]);

  const onClickHandler = useCallback(() => {
    const now = Date.now();

    if (database && !beerDrinkDays?.some(day => isSameDay(day, now))) {
      beerDrinkDays?.length > 0
        ? database.ref().update({ beerDrinkDays: [...beerDrinkDays, now] })
        : database.ref('beerDrinkDays').set([now]);
    }
  }, [database, beerDrinkDays]);

  return (
    <>
      {months.map((month, monthNumber) => {
        const monthName = format(new Date(startYear, monthNumber), 'LLLL', {
          locale: ru,
        });
        return (
          <Box key={monthNumber}>
            <Txt italic style={{ width: 70 }}>
              {monthName[0].toUpperCase().concat(monthName.slice(1))}
            </Txt>
            <Month daysNumber={month.length}>
              {month.map((day, index) => (
                <Week
                  tooltip={format(day, 'd MMMM eeee', {
                    locale: ru,
                  })}
                  passed={beerDrinkDays?.some(drinkDay =>
                    isSameDay(drinkDay, day)
                  )}
                  key={index}
                />
              ))}
            </Month>
          </Box>
        );
      })}
      <Button onClick={onClickHandler}>Do stuff</Button>
    </>
  );
};

export default Timeline;
