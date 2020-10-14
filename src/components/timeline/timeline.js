import React, { useState, useCallback } from 'react';
import { format, isSameDay } from 'date-fns';
import { Button, Txt, Box, Modal, Input } from 'rendition';
import { ru } from 'date-fns/locale';
import { Week, Month } from './timeline.css';
import { useDays, startYear } from './useDays';
import { useBeerDrinkDays } from './useBeerDrinkDays';
import { useLongPress } from './useLongPress';

function Day({ marked, day, handleDayLogTap }) {
  const handleLong = useLongPress(
    () => handleDayLogTap(day),
    () => {}
  );

  return (
    <Week
      {...handleLong}
      tooltip={format(day, 'd MMMM eeee', {
        locale: ru,
      })}
      passed={marked}
    />
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
                <Day
                  day={day}
                  key={index}
                  handleDayLogTap={handleDayLogTap}
                  marked={beerDrinkDays?.some(drinkDay =>
                    isSameDay(drinkDay, day)
                  )}
                />
              ))}
            </Month>
          </Box>
        );
      })}
      {modalState.show && (
        <Modal
          title={`Выпили пива ${format(modalState.day, 'd MMMM eeee', {
            locale: ru,
          })} ?`}
          cancel={() => {
            // cancelAction();
            setModalState({ show: false });
          }}
          done={x => {
            handleAddDay(modalState.day);
            setModalState({ show: false });
          }}
        >
          <Box>
            <Input></Input>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Timeline;
