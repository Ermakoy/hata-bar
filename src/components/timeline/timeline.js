import React from 'react';
import { format, isSameDay } from 'date-fns';
import { Button, Txt, Box, Modal } from 'rendition';
import { ru } from 'date-fns/locale';
import { Week, Month } from './timeline.css';
import { useDays, startYear } from './useDays';
import { useBeerDrinkDays } from './useBeerDrinkDays';

const Timeline = () => {
  const months = useDays();
  const { beerDrinkDays, handleAddToday } = useBeerDrinkDays();
  return (
    <>
      {months.map((month, monthNumber) => {
        const monthName = format(new Date(startYear, monthNumber), 'LLLL', {
          locale: ru,
        });
        return (
          <Box key={monthNumber}>
            <Txt.span italic style={{ width: 70 }}>
              {monthName[0].toUpperCase().concat(monthName.slice(1))}
            </Txt.span>
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
      <Button onClick={handleAddToday}>Do stuff</Button>
    </>
  );
};

export default Timeline;
