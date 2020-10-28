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

function Day({ marked, day, handleDayLogTap }) {
  const handleLong = useLongPress(() => handleDayLogTap(day), {
    isPreventDefault: false,
  });
  return (
    <Tooltip
      content={format(day, 'd MMMM eeee', {
        locale: ru,
      })}
    >
      <Week {...handleLong} passed={marked} />
    </Tooltip>
  );
}

const Timeline = () => {
  const months = useDays();
  const { beerDrinkDays, handleAddDay } = useBeerDrinkDays();
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
            <Txt.span italic style={{ width: 70 }}>
              {monthName[0].toUpperCase().concat(monthName.slice(1))}
            </Txt.span>
            <Month daysNumber={month.length}>
              {month.map((day, index) => (
                <Day
                  day={day}
                  key={index}
                  dayNumber={index}
                  handleDayLogTap={handleDayLogTap}
                  marked={beerDrinkDays?.some(({ date: drinkDay }) =>
                    isSameDay(drinkDay, day)
                  )}
                />
              ))}
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
