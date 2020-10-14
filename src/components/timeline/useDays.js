import { useMemo } from 'react';
import { getDaysInMonth } from 'date-fns';

export const startYear = 2020;

export const useDays = () =>
  useMemo(
    () =>
      Array.from({ length: 12 }).map((el, monthNumber) => {
        const daysCount = getDaysInMonth(new Date(startYear, monthNumber));
        return Array.from({ length: daysCount }).map(
          (day, daysNumber) => new Date(startYear, monthNumber, daysNumber)
        );
      }),
    []
  );
