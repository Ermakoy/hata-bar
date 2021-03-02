import {
  eachDayOfInterval, getMonth, getYear,
} from 'date-fns';
import {
  groupBy,
} from 'lodash';
import {
  useMemo,
} from 'react';

export const START_YEAR = 2_020;

export const useDays = (startYear) => useMemo(() => {
  const start_year = startYear || START_YEAR;
  const allDays = eachDayOfInterval({
    end: Date.now(),
    start: new Date(start_year, 0, 1),
  });
  const daysByYear = groupBy(allDays, getYear);

  return Object.fromEntries(
    Object.entries(daysByYear).map(([year, days]) => [
      year,
      Object.values(groupBy(days, getMonth)).sort(([a], [b]) => a - b),
    ]),
  );
}, [startYear]);
