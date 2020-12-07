import React, { useState, useCallback } from 'react';
import { format, isSameDay } from 'date-fns';
import { Button, Txt, Box, Modal, Input } from 'rendition';
import { ru } from 'date-fns/locale';
import { useLongPress } from 'react-use';
import { Week, Month } from './timeline.css';
import { useDays, START_YEAR } from './useDays';
import { useBeerDrinkDays } from './useBeerDrinkDays';
import { InputModal } from './InputModal';
import { Tooltip } from './Tooltip';
import { PersonDrink } from './PersonDrink';

function Day({ marked, day, handleDayLogTap, names, isLoading }) {
  const handleLong = useLongPress(() => handleDayLogTap(day), {
    isPreventDefault: false,
  });
  let tooltipContent = format(day, 'd MMMM eeee', {
    locale: ru,
  });
  if (names?.length) {
    const prefix = names?.length > 1 ? 'Пили' : 'Пил';
    tooltipContent = tooltipContent.concat('\n').concat();
  }
  return (
    <Tooltip content={tooltipContent}>
      <Week {...handleLong} isLoading={isLoading} passed={!!names}>
        {names?.map(name => (
          <PersonDrink name={name} />
        ))}
      </Week>
    </Tooltip>
  );
}

const Timeline = () => {
  const months = useDays();
  const { beerDrinkDays, handleAddDay, isLoading } = useBeerDrinkDays();
  const [modalState, setModalState] = useState({ show: false });
  const handleDayLogTap = useCallback(
    day => setModalState({ show: true, day }),
    []
  );
  return (
    <>
      {months.map((month, monthNumber) => {
        const monthName = format(new Date(START_YEAR, monthNumber), 'LLLL', {
          locale: ru,
        });
        return (
          <Box key={monthNumber}>
            <Txt.span italic fontSize={3} style={{ width: 70 }}>
              {monthName[0].toUpperCase().concat(monthName.slice(1))}
            </Txt.span>
            <Month daysNumber={month.length}>
              {month.map((day, index) => {
                const matchDay = beerDrinkDays?.find(({ date: drinkDay }) =>
                  isSameDay(drinkDay, day)
                );
                return (
                  <Day
                    day={day}
                    key={index}
                    isLoading={isLoading}
                    handleDayLogTap={handleDayLogTap}
                    names={matchDay?.name}
                  />
                );
              })}
            </Month>
          </Box>
        );
      })}
      {modalState.show && (
        <InputModal
          modalState={modalState}
          setModalState={setModalState}
          handleAddDay={handleAddDay}
        />
      )}
    </>
  );
};

export default Timeline;
