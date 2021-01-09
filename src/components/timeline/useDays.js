import { useMemo } from 'react';
import { dropRight, range } from 'lodash';
import { getMonth, eachDayOfInterval, getYear } from 'date-fns';
import { getDaysInMonth, eachYearOfInterval } from 'date-fns';

export const START_YEAR = 2020;

const getPrevYears = (startYear = START_YEAR) =>
  dropRight(
    eachYearOfInterval({
      start: new Date(startYear, 0, 1),
      end: new Date(),
    }).map(getYear)
  );

const getFullMonths = (monthCount, year = START_YEAR) =>
  range(monthCount).map(monthNumber =>
    range(getDaysInMonth(new Date(year, monthNumber))).map(
      daysNumber => new Date(year, monthNumber, daysNumber + 1)
    )
  );

export const useDays = (startYear = START_YEAR) =>
  useMemo(() => {
    const pastYears = getPrevYears();
    const today = new Date();
    return {
      ...pastYears.reduce(
        (acc, val) => ({ ...acc, [val]: getFullMonths(12, val) }),
        {}
      ),
      [getYear(today)]: getFullMonths(getMonth(today), startYear).concat([
        eachDayOfInterval({
          start: new Date(getYear(today), getMonth(today), 1),
          end: today,
        }),
      ]),
    };
  }, [startYear]);
