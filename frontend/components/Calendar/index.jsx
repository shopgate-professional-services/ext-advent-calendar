import React, {
  useCallback, useEffect, useState,
} from 'react';
import { ToastProvider, UIEvents } from '@shopgate/engage/core';
import { Grid } from '@shopgate/engage/components';
import ActiveDayCell from './components/ActiveDayCell';
import ExpiredDayCell from './components/ExpiredDayCell';
import FutureDayCell from './components/FutureDayCell';
import RewardSheet from '../RewardSheet';
import Snowfall from '../Snowfall';
import {
  getCalendarDayConfig, getCalendarDays, isDayExpired, isFutureDay,
} from '../../helpers';
import config from '../../config.json';
import { styles } from './styles';

const { messages, calendarGrid } = config;
const { fallingSnow, sheetDelay = 1500 } = calendarGrid;

/**
 * @returns {JSX}
 */
const Calendar = () => {
  const [activeDay, setActiveDay] = useState(null);
  const [showSheet, setShowSheet] = useState(false);

  const activateDay = useCallback((day) => {
    if (isFutureDay(day)) {
      UIEvents.emit(ToastProvider.ADD, {
        id: 'advent.calendar',
        message: messages.dayInFuture || 'modal.body_error',
      });
    } else if (!getCalendarDayConfig(day)) {
      UIEvents.emit(ToastProvider.ADD, {
        id: 'advent.calendar',
        message: messages.dayNotFound || 'modal.body_error',
      });
    } else {
      setActiveDay(day);
    }
  }, []);

  useEffect(() => {
    let t;
    if (activeDay) {
      t = setTimeout(() => setShowSheet(true), sheetDelay);
    }
    return () => {
      if (t) {
        clearTimeout(t);
      }
    };
  }, [activeDay]);

  useEffect(() => {
    if (!showSheet) {
      setActiveDay(null);
    }
  }, [showSheet]);

  const dayConfig = getCalendarDayConfig(activeDay);

  return (
    <>
      <div className={styles.gridWrapper}>
        {fallingSnow && <Snowfall />}

        <Grid className={styles.grid.toString()}>
          {getCalendarDays().map((day) => {
            if (isDayExpired(day)) {
              return (
                <ExpiredDayCell key={day} day={day} />
              );
            }

            if (isFutureDay(day)) {
              return (
                <FutureDayCell
                  key={day}
                  day={day}
                  onActivateDay={activateDay}
                />
              );
            }

            return (
              <ActiveDayCell
                key={day}
                day={day}
                onActivateDay={activateDay}
              />
            );
          })}
        </Grid>
      </div>

      <RewardSheet
        isOpen={showSheet}
        content={dayConfig}
        onClose={() => setShowSheet(false)}
      />

    </>
  );
};

export default Calendar;
