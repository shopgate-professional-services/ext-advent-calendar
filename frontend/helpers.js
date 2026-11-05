import shuffle from 'lodash/shuffle';
import config from './config.json';

const { calendarGrid, calendar } = config;

const { randomizeNumbers } = calendarGrid;

/**
 * @returns {Date} The current date, or the date set via window.Engage.date for testing.
 */
const getNowDate = () => new Date((
  window.Engage && window.Engage.date ? window.Engage.date : new Date()
).getTime());

let days;
/**
 * @returns {Array}
 */
export const getCalendarDays = () => {
  if (!days) {
    days = new Array(24)
      .fill(0)
      .map((d, ind) => ind + 1);

    if (randomizeNumbers) {
      days = shuffle(days);
    }
  }
  return days;
};

/**
 * @return {boolean}
 */
export const isCalendarAllowed = () => {
  const today = getNowDate();

  if (today.getMonth() !== 11) {
    return false;
  }

  const day = today.getDate();
  return day >= 1 && day <= 24;
};

/**
 * @param {number} day .
 * @return {boolean}
 */
export const isDayExpired = (day) => {
  if (day < 1 || day > 24) {
    return true;
  }

  const todayStart = getNowDate();
  todayStart.setHours(0, 0, 0);

  const date = getNowDate();
  date.setDate(day);

  return date < todayStart;
};

/**
 * @param {number} day .
 * @return {boolean}
 */
export const isFutureDay = (day) => {
  if (day < 1 || day > 24) {
    return false;
  }

  const todayEnd = getNowDate();
  todayEnd.setHours(23, 59, 59);

  const date = getNowDate();
  date.setDate(day);

  return date > todayEnd;
};

/**
 * @return {number}
 */
export const getCountDownSeconds = () => {
  const start = getNowDate();
  start.setMonth(11, 1);
  start.setHours(0, 0, 0);

  const diff = getNowDate().getTime() - Date.now();

  return (start.getTime() - diff) / 1000;
};

/**
 * @param {number} day .
 * @return {Object}
 */
export const getCalendarDayConfig = day => (
  calendar.find(d => (
    parseInt(d.day, 10) === parseInt(day, 10)
  )) || null
);
