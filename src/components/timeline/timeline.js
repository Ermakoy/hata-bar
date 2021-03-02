import {
  format, getYear, isSameDay,
} from 'date-fns';
import {
  ru,
} from 'date-fns/locale';
import {
  head,
  countBy,
} from 'lodash';
import React, {
  useCallback, useMemo, useState,
} from 'react';
import {
  useLongPress,
} from 'react-use';
import {
  Box, Tab, Tabs, Txt,
} from 'rendition';
import {
  ermakoyKey,
  InputModal, markKey,
} from './InputModal';
import {
  PersonDrink,
} from './PersonDrink';
import {
  Tooltip,
} from './Tooltip';
import {
  Month, Week,
} from './timeline.css';
import {
  useBeerDrinkDays,
} from './useBeerDrinkDays';
import {
  START_YEAR, useDays,
} from './useDays';

const namesMap = {
  ermakoy: 'Андрей', mark: 'Марк',
};

function getTooltipContent ({names, day}) {
  const tooltipContent = format(
    day,
    'd MMMM eeee',
    {
      locale: ru,
    },
  );
  let prefix = 'Никто не пил';
  if (names?.length >= 1) {
    prefix = names.map((name) => namesMap[name]).join(' и ').concat(' ').concat(names?.length > 1 ? 'пили' : 'пил');
  }

  return prefix + '\n' + tooltipContent;
}

function Day ({day, onLongTap, names, isLoading}) {
  const handleLong = useLongPress(
    () => onLongTap(day),
    {
      isPreventDefault: false,
    },
  );
  const tooltipContent = getTooltipContent({day, names});

  return (
    <Tooltip content={tooltipContent}>
      <Week
        {...handleLong}
        isLoading={isLoading}
        passed={Boolean(names)}
      >
        {names?.map((name) => <PersonDrink
          key={name}
          name={name}
        />)}
      </Week>
    </Tooltip>
  );
}

function Timeline () {
  const {beerDrinkDays, handleAddDay, isLoading} = useBeerDrinkDays();
  const earliestDrinkDayYear = useMemo(
    () => getYear(head(beerDrinkDays.map(({date}) => date).sort((a, b) => a - b))),
    [beerDrinkDays],
  );
  const monthsByYear = useDays(earliestDrinkDayYear);
  const [
    modalState,
    setModalState,
  ] = useState({show: false});
  const handleDayLogTap = useCallback(
    (day) => setModalState({
      day,
      show: true,
    }),
    [],
  );
  const Span = Txt.span;
  const renderMonth = useCallback(
    (month, monthNumber) => {
      const monthName = format(
        new Date(
          START_YEAR,
          monthNumber,
        ),
        'LLLL',
        {
          locale: ru,
        },
      );

      return (
        <Box key={month.toString()}>
          <Span
            fontSize={3}
            italic
            style={{width: 70}}
          >
            {monthName[0].toUpperCase().concat(monthName.slice(1))}
          </Span>

          <Month>
            {month.map((day) => {
              const matchDay = beerDrinkDays?.find(({date: drinkDay}) => isSameDay(
                drinkDay,
                day,
              ));

              return (
                <Day
                  day={day}
                  isLoading={isLoading}
                  key={Number(day)}
                  names={matchDay?.name}
                  onLongTap={handleDayLogTap}
                />
              );
            })}
          </Month>
        </Box>
      );
    },
    [
      beerDrinkDays,
      isLoading,
      handleDayLogTap,
    ],
  );
  const years = useMemo(
    () => Object.keys(monthsByYear).map((element) => Number(element)),
    [monthsByYear],
  );
  const [
    currentYearIndex,
    setCurrentYearIndex,
  ] = useState(years.findIndex((year) => new Date().getFullYear() === year));

  return (
    <>
      {Object.keys(monthsByYear).length === 1 ?
        Object.entries(monthsByYear)[0][1].map(renderMonth) :
        <Tabs
          activeIndex={currentYearIndex}
          onActive={setCurrentYearIndex}
        >
          {Object.entries(monthsByYear).map(([
            year,
            months,
          ]) => <Tab
            key={year}
            title={year}
          >
            {months.map(renderMonth)}
          </Tab>)}
        </Tabs>}

      {modalState.show &&
      <InputModal
        handleAddDay={handleAddDay}
        modalState={modalState}
        setModalState={setModalState}
      />}
    </>
  );
}

export default Timeline;
