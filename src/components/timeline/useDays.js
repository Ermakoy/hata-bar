import { useMemo } from 'react';
import { getMonth, eachDayOfInterval, getYear } from 'date-fns';
import { getDaysInMonth } from 'date-fns';

export const START_YEAR = 2020;

const getFullMonths = (monthCount, startYear = START_YEAR) =>
  Array.from({ length: monthCount }).map((el, monthNumber) => {
    const daysCount = getDaysInMonth(new Date(startYear, monthNumber));
    return Array.from({ length: daysCount }).map(
      (day, daysNumber) => new Date(startYear, monthNumber, daysNumber + 1)
    );
  });

export const useDays = () =>
  useMemo(() => {
    const today = new Date();
    return getFullMonths(getMonth(today)).concat([
      eachDayOfInterval({
        start: new Date(getYear(today), getMonth(today), 1),
        end: today,
      }),
    ]);
  }, []);
