import React from 'react';
import { TimelineContainer, Week } from './timeline.css';

const BIRTH_DATE = new Date('1999-03-25');
const WEEKS_IN_YEAR = 52;
const WEEK = 1000 * 60 * 60 * 24 * 7;
const YEARS_I_THINK_I_WILL_LIVE = 65;

const getWeekNumberText = weekNumber =>
  `Номер недели: ${(weekNumber % 52) + 1}
Год: ${Math.trunc(weekNumber / 52)}`;

const Timeline = props => {
  const now = new Date();
  const passedWeeks = (now - BIRTH_DATE) / WEEK;

  return (
    <TimelineContainer>
      {Array.from({ length: WEEKS_IN_YEAR * YEARS_I_THINK_I_WILL_LIVE }).map(
        (_, weekNumber) => (
          <Week
            title={getWeekNumberText(weekNumber)}
            key={weekNumber}
            passed={weekNumber < passedWeeks}
          />
        )
      )}
    </TimelineContainer>
  );
};

export default Timeline;
