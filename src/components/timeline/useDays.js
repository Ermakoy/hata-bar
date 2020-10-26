import { useMemo } from 'react';
import { isSameDay } from 'date-fns';
import { getDaysInMonth } from 'date-fns';

export const startYear = 2020;

export const useDays = () =>
  useMemo(() => {
    const month = Array.from({ length: 12 }).map((el, monthNumber) => {
      const daysCount = getDaysInMonth(new Date(startYear, monthNumber));
      return Array.from({ length: daysCount }).map(
        (day, daysNumber) => new Date(startYear, monthNumber, daysNumber + 1)
      );
    });
    const today = new Date();
    let currentDay = new Date(startYear, 0, 1);
    let currentMonth = 0;
    let daysInMonth = getDaysInMonth(currentDay);
    while (!isSameDay(currentDay, today)) {}
  }, []);
