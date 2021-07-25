import {
  format, getYear, isSameDay,
  startOfWeek,
  endOfWeek,
  add, sub,
  getMonth,
  eachDayOfInterval,
} from 'date-fns';
import {
  ru,
} from 'date-fns/locale';
import {
  head,
  countBy,
  capitalize,
  last,
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
  Month, Week, Year,
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

function Day ({day, onLongTap, names, isLoading, inactive}) {
  const handleLong = useLongPress(
    () => onLongTap(day),
    {
      isPreventDefault: false,
    },
  );
  const tooltipContent = getTooltipContent({day, names});

  return inactive ? <Week inactive /> :
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
    </Tooltip>;
}

function leftPadDays (day) {
  let leftDays;

  try {
    leftDays = eachDayOfInterval({
      end: sub(day, {days: 1}),
      start: startOfWeek(day, {weekStartsOn: 1}),
    });
  } catch {
    leftDays = [];
  }

  return leftDays;
}

function rightPadDays (day) {
  let rightDays;

  try {
    rightDays = eachDayOfInterval({
      end: endOfWeek(day, {weekStartsOn: 1}),
      start: add(day, {days: 1}),
    });
  } catch {
    rightDays = [];
  }

  return rightDays;
}

const Span = Txt.span;

function MonthTitle ({monthName, count, markCount, andreyCount}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Span
        fontSize={3}
        italic
        onMouseEnter={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        style={{width: 70}}
      >
        {capitalize(monthName)}
      </Span>
      {isHovered &&
        <>
          <Span bold fontSize={2}> Пили {count} раз</Span>
          <Span bold fontSize={2}> Марк: {markCount}</Span>
          <Span bold fontSize={2}> Андрей: {andreyCount}</Span>
        </>}
    </>
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
  const renderMonth = useCallback(
    (year, month, monthNumber) => {
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
      const thisMonthDrinks = beerDrinkDays?.filter(({date}) => getYear(date) === Number(year) && getMonth(date) === monthNumber);
      const {markCount, andreyCount} = thisMonthDrinks?.reduce((accumulator, {name}) => ({
        andreyCount: accumulator.andreyCount + Number(name.includes('ermakoy')),
        markCount: accumulator.markCount + Number(name.includes('mark')),
      }), {andreyCount: 0, markCount: 0}) ?? {};

      return (
        <Box key={month.toString()}>
          <MonthTitle
            andreyCount={andreyCount}
            count={thisMonthDrinks.length}
            markCount={markCount}
            monthName={monthName}
          />
          <Month>
            {leftPadDays(month[0]).concat(month).concat(rightPadDays(last(month))).map((day) => {
              const matchDay = beerDrinkDays?.find(({date: drinkDay}) => isSameDay(
                drinkDay,
                day,
              ));

              return (
                <Day
                  day={day}
                  inactive={monthNumber !== getMonth(day)}
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

  return <>
    {Object.keys(monthsByYear).length === 1 ?
      Object.entries(monthsByYear)[0][1].map(renderMonth) :
      <Tabs
        activeIndex={currentYearIndex}
        onActive={setCurrentYearIndex}
      >
        {Object.entries(monthsByYear).map((
          [
            year,
            months,
          ],
        ) => {
          const thisYearDrinks = beerDrinkDays?.filter(({date}) => getYear(date) === Number(year));
          const {markCount, andreyCount} = thisYearDrinks?.reduce((accumulator, {name}) => ({
            andreyCount: accumulator.andreyCount + Number(name.includes('ermakoy')),
            markCount: accumulator.markCount + Number(name.includes('mark')),
          }), {andreyCount: 0, markCount: 0}) ?? {};

          return (
            <Tab
              key={year}
              title={year}
            >
              <div>
                <div>В этом году пили {thisYearDrinks.length} раз</div>
                <div>Андрей: {andreyCount} раз</div>
                <div>Марк: {markCount} раз</div>
              </div>
              <Year>
                {months.map(renderMonth.bind(this, year))}
              </Year>
            </Tab>
          );
        })}
      </Tabs>}

    {modalState.show &&
    <InputModal
      handleAddDay={handleAddDay}
      modalState={modalState}
      setModalState={setModalState}
    />}
  </>;
}

export default Timeline;
