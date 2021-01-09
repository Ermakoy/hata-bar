import React, { useState, useCallback, useMemo } from 'react';
import { head } from 'lodash';
import { format, isSameDay, getYear } from 'date-fns';
import { Button, Txt, Box, Modal, Input, Tabs, Tab } from 'rendition';
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
          <PersonDrink key={name} name={name} />
        ))}
      </Week>
    </Tooltip>
  );
}

const Timeline = () => {
  const { beerDrinkDays, handleAddDay, isLoading } = useBeerDrinkDays();
  const earliestDrinkDayYear = useMemo(
    () =>
      getYear(
        head(beerDrinkDays.map(({ date }) => date).sort((a, b) => a - b))
      ),
    [isLoading]
  );
  const monthsByYear = useDays(earliestDrinkDayYear);
  const renderMonth = useCallback(
    (month, monthNumber) => {
      const monthName = format(new Date(START_YEAR, monthNumber), 'LLLL', {
        locale: ru,
      });
      return (
        <Box key={month.toString()}>
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
    },
    [beerDrinkDays, isLoading]
  );
  const [modalState, setModalState] = useState({ show: false });
  const handleDayLogTap = useCallback(
    day => setModalState({ show: true, day }),
    []
  );
  return (
    <>
      {Object.keys(monthsByYear).length === 1 ? (
        Object.entries(monthsByYear)[0][1].map(renderMonth)
      ) : (
        <Tabs>
          {Object.entries(monthsByYear).map(([year, months]) => (
            <Tab key={year} title={year}>
              {months.map(renderMonth)}
            </Tab>
          ))}
        </Tabs>
      )}
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
